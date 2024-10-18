/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  clearGpsStopsData,
  fetchAddressRequest,
  fetchGpsStopsRequest,
  fetchTokenRequest,
} from '../../Store/Actions/Actions';
import moment from 'moment';
import RightArrow from '../../../assets/SVG/svg/RightArrow';
import {backgroundColorNew} from '../../Color/color';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import styles from './style';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import HistoryStopsShimmer from '../../Components/Shimmer/History&StopsShimmer';

const RenderStopsItem = React.memo(({item, index, onShowAddress}) => {
  const date = new Date(item.startTime).toLocaleDateString();
  const lat = item.latitude;
  const lng = item.longitude;
  const itemId = item.positionId;
  const address = item.address;
  const startTime = new Date(item.startTime).toLocaleTimeString();
  const endTime = new Date(item.endTime).toLocaleTimeString();
  const durationInHours = (item.duration / (1000 * 60 * 60)).toFixed(2);

  return (
    <View style={styles.tripItemContainer} key={index}>
      <View style={styles.statusIndicatorContainer}>
        <View style={styles.greenIndicator} />
        <View style={styles.line} />
        <View style={styles.redIndicator} />
      </View>
      <View style={styles.tripDetailsContainer}>
        <StopDetail det={'Start Time'} date={date} time={startTime} />
        <StopStats
          address={address}
          lat={lat}
          lng={lng}
          itemId={itemId}
          duration={durationInHours}
          onShowAddress={onShowAddress}
        />
        <StopDetail det={'End Time'} date={date} time={endTime} />
      </View>
    </View>
  );
});

const StopDetail = ({det, date, time}) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.showTimeText(det)}>{det}</Text>
      <Text style={styles.locHistoryTimeText}>{`${date} | ${time}`}</Text>
    </View>
  );
};

const ShowFullAddress = ({lat, lng, itemId, onShowAddress}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      style={styles.showAddressContainer}
      onPress={() => onShowAddress(itemId, lat, lng)}>
      <Text style={styles.showAddressText}>
        {t(Constants.SHOW_FULL_ADDRESS)}
      </Text>
      <RightArrow size={15} color={'#EF4D23'} />
    </TouchableOpacity>
  );
};

function formatDuration(duration) {
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);
  return `${hours} hr ${minutes} mins`;
}

const StopStats = ({address, lat, lng, itemId, duration, onShowAddress}) => {
  const {fullAddressData, fullAddressCustomId} = useSelector(
    state => state.data,
  );
  return (
    <View style={styles.detailContainer}>
      {address || (fullAddressCustomId === itemId && fullAddressData) ? (
        <Text style={styles.locHistoryAddressText}>
          {address || fullAddressData}
        </Text>
      ) : (
        <ShowFullAddress
          lat={lat}
          lng={lng}
          itemId={itemId}
          onShowAddress={onShowAddress}
        />
      )}
      <Text style={styles.locHistoryTimeText}>{`Duration: ${formatDuration(
        duration,
      )}`}</Text>
    </View>
  );
};

const StopsScreen = ({navigation, route}) => {
  useTrackScreenTime('StopsScreen');
  const {deviceId, name, from, to} = route?.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    gpsStopsData,
    gpsStopsLoading,
    gpsTokenData,
    gpsTripsError,
    gpsSummaryError,
  } = useSelector(state => {
    console.log('-------StopsScreen-------', state);
    return state.data;
  });

  const {wsConnected} = useSelector(state => state.wsData);

  useEffect(() => {
    if (gpsTokenData) {
      setTimeout(() => setInitialLoading(false), 1000);
    }
  }, [gpsTokenData]);

  useEffect(() => {
    if (wsConnected) {
      dispatch(websocketDisconnect());
    }
  }, [wsConnected, dispatch]);

  useEffect(() => {
    if (!gpsTokenData) {
      dispatch(fetchTokenRequest());
    }
  }, [gpsTokenData, dispatch]);

  const handleShowAddress = (itemId, lat, lng) => {
    dispatch(fetchAddressRequest(lat, lng, itemId));
  };

  const StopsTab = () => (
    <View style={styles.contentContainer}>
      {gpsTripsError || gpsSummaryError ? (
        <View style={styles.locHistoryErrorContainer}>
          <Text style={styles.locHistoryErrorText}>
            Failed to fetch data. Please try again.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetryStops}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : gpsStopsLoading ? (
        <View>
          <HistoryStopsShimmer />
        </View>
      ) : (
        <FlatList
          data={gpsStopsData}
          renderItem={({item, index}) => (
            <RenderStopsItem
              item={item}
              index={index}
              onShowAddress={handleShowAddress}
            />
          )}
          // keyExtractor={item => item.id}
          keyExtractor={item => `${item.startTime}-${item.endTime}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noDataView}>
              <Text style={styles.locHistorynoDataText}>
                {t(Constants.NO_TRIPS)}
              </Text>
            </View>
          }
          style={styles.tableContainer}
        />
      )}
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      if (gpsTokenData) {
        const defaultFrom =
          from || moment().utcOffset(330).startOf('day').toISOString();
        const defaultTo =
          to || moment().utcOffset(330).endOf('day').toISOString();

        dispatch(
          fetchGpsStopsRequest(
            gpsTokenData?.email,
            gpsTokenData?.password,
            deviceId,
            defaultFrom,
            defaultTo,
          ),
        );
      }

      return () => {
        dispatch(clearGpsStopsData());
      };
    }, [dispatch, deviceId, from, to, gpsTokenData]),
  );

  const handleRetryStops = () => {
    if (gpsTokenData) {
      const defaultFrom =
        from || moment().utcOffset(330).startOf('day').toISOString();
      const defaultTo =
        to || moment().utcOffset(330).endOf('day').toISOString();

      dispatch(
        fetchGpsStopsRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
        ),
      );
    }
  };

  if (initialLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={backgroundColorNew} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StopsTab />
    </View>
  );
};

export default StopsScreen;
