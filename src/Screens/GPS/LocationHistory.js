import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  clearGpsTripsData,
  clearSummaryReportData,
  fetchAddressRequest,
  fetchGpsTripsRequest,
  fetchSummaryReportRequest,
  fetchTokenRequest,
} from '../../Store/Actions/Actions';
import moment from 'moment';
import DownloadIcon from '../../../assets/SVG/svg/DownloadIcon';
import CalendarIcon from '../../../assets/SVG/CalendarIcon';
import RightArrow from '../../../assets/SVG/svg/RightArrow';
import {backgroundColorNew} from '../../Color/color';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import {convertToCSV} from '../../Utils/CSVutils';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import styles from './style';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import {SceneMap, TabView} from 'react-native-tab-view';
import NotFound from '../../Components/NotFound';
import MyLorryShimmer from '../../Components/Shimmer/MyLorryShimmer';
import RenderTabBar from '../Requests/RenderTabBar';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const convertMillisToTime = millis => {
  const hours = Math.floor(millis / (1000 * 60 * 60));
  const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

function getRoutesForUserType(t) {
  return [
    {key: 'active', title: `${t(Constants.HISTORY)}`},
    {key: 'inactive', title: `${t(Constants.STOPS)}`},
  ];
}

const TripItem = React.memo(({item, onShowAddress}) => {
  const {t} = useTranslation();
  // console.log(8888888888, item);
  return (
    <View style={styles.tripItemContainer}>
      <View style={styles.statusIndicatorContainer}>
        <View style={styles.greenIndicator} />
        <View style={styles.line} />
        <View style={styles.redIndicator} />
      </View>
      <View style={styles.tripDetailsContainer}>
        <TripDetail
          address={item?.startAddress}
          time={item?.startTime}
          lat={item?.startLat}
          lng={item?.startLon}
          itemId={item.startPositionId}
          onShowAddress={onShowAddress}
        />
        <TripStats
          distance={item?.distance}
          averageSpeed={item?.averageSpeed}
          duration={item?.duration}
          t={t}
        />
        <TripDetail
          address={item?.endAddress}
          time={item?.endTime}
          lat={item?.endLat}
          lng={item?.endLon}
          itemId={item.endPositionId}
          onShowAddress={onShowAddress}
        />
      </View>
    </View>
  );
});

const TripDetail = ({address, time, lat, lng, itemId, onShowAddress}) => {
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
      <Text style={styles.locHistoryTimeText}>
        {moment(time).utcOffset('+05:30').format('DD/MM/YYYY hh:mm A')}
      </Text>
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

const TripStats = ({distance, averageSpeed, duration, t}) => (
  <View style={styles.tripStatsContainer}>
    <StatBox
      value={`${(distance / 1000).toFixed(2)} KM`}
      label={t(Constants.TOT_DIS)}
    />
    <VerticalLine />
    <StatBox
      value={`${(averageSpeed * 1.852).toFixed(2)} km/h`}
      label={t(Constants.AVG_SPEED)}
    />
    <VerticalLine />
    <StatBox
      value={convertMillisToTime(duration)}
      label={t(Constants.DURATION)}
    />
  </View>
);

const StatBox = ({value, label}) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const StopBox = ({label, value}) => (
  <View style={styles.stopBox}>
    <Text style={styles.locHistoryStopText}>{label}</Text>
    <Text style={styles.locHistoryStopCount}>{value}</Text>
  </View>
);

const VerticalLine = () => <View style={styles.locHistoryVerticalLine} />;

const LocationHistory = ({navigation, route}) => {
  useTrackScreenTime('LocationHistory');
  const {deviceId, name, from, to} = route?.params;
  // console.log(777777, route);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    gpsTripsLoading,
    gpsTripsData,
    gpsTokenData,
    gpsSummaryData,
    gpsTripsError,
    gpsSummaryError,
  } = useSelector(state => {
    console.log(444444444, state);
    return state.data;
  });

  const {wsConnected} = useSelector(state => state.wsData);

  const routes = useMemo(() => getRoutesForUserType(t), []);

  const handleDownload = async () => {
    if (gpsTripsData && gpsTripsData.length > 0) {
      const csvData = convertToCSV(gpsTripsData);

      const path = `${RNFS.DocumentDirectoryPath}/gps_replay_data.csv`;

      // Write the file to the device
      await RNFS.writeFile(path, csvData, 'utf8')
        .then(() => {
          // Share the file
          Share.open({
            url: `file://${path}`,
            type: 'text/csv',
            filename: 'gps_replay_data',
            showAppsToView: true,
          })
            .then(res => console.log('File shared:', res))
            .catch(err => console.error('Error sharing file:', err));
        })
        .catch(err => {
          console.error('Error writing file:', err);
        });
    } else {
      // alert('No data available to download.');
    }
  };

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

  useEffect(() => {
    switch (index) {
      case 0:
        setSelected(1);
        break;
      case 1:
        setSelected(0);
        break;
      default:
        break;
    }
  }, [index]);

  const handleShowAddress = (itemId, lat, lng) => {
    dispatch(fetchAddressRequest(lat, lng, itemId));
  };

  // tabview
  const HistoryTab = () => (
    <View style={styles.contentContainer}>
      {gpsTripsError || gpsSummaryError ? (
        <View style={styles.locHistoryErrorContainer}>
          <Text style={styles.locHistoryErrorText}>
            Failed to fetch data. Please try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : gpsTripsLoading ? (
        <ActivityIndicator
          size="large"
          color={backgroundColorNew}
          style={styles.locHistoryLoader}
        />
      ) : (
        <FlatList
          data={gpsTripsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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

  const StopsTab = () => (
    <View style={styles.contentContainer}>
      {gpsTripsError || gpsSummaryError ? (
        <View style={styles.locHistoryErrorContainer}>
          <Text style={styles.locHistoryErrorText}>
            Failed to fetch data. Please try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : gpsTripsLoading ? (
        <ActivityIndicator
          size="large"
          color={backgroundColorNew}
          style={styles.locHistoryLoader}
        />
      ) : (
        <FlatList
          data={gpsTripsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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

  useEffect(() => {
    setSelected(index + 1);
  }, [index]);
  // tabview

  useFocusEffect(
    useCallback(() => {
      if (gpsTokenData) {
        dispatch(
          fetchSummaryReportRequest(
            gpsTokenData.email,
            gpsTokenData.password,
            deviceId,
            encodeURIComponent(from),
            encodeURIComponent(to),
            false,
          ),
        );
        dispatch(
          fetchGpsTripsRequest(
            gpsTokenData.email,
            gpsTokenData.password,
            deviceId,
            from,
            to,
          ),
        );
      }

      return () => {
        dispatch(clearGpsTripsData());
        dispatch(clearSummaryReportData());
      };
    }, [dispatch, deviceId, from, to, gpsTokenData]),
  );

  const handleRetry = () => {
    if (gpsTokenData) {
      dispatch(
        fetchSummaryReportRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          deviceId,
          from,
          to,
          false,
        ),
      );
      dispatch(
        fetchGpsTripsRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          deviceId,
          from,
          to,
        ),
      );
    }
  };

  const renderItem = useCallback(
    ({item}) => <TripItem item={item} onShowAddress={handleShowAddress} />,
    [],
  );

  const calculateAverageSpeed = () => {
    if (gpsTripsData && gpsTripsData.length > 0) {
      const totalSpeed = gpsTripsData.reduce(
        (acc, trip) => acc + (trip.averageSpeed || 0),
        0,
      );
      return (totalSpeed / gpsTripsData.length).toFixed(2);
    }
    return '0.00';
  };

  const shouldCalculateAverageSpeed =
    gpsSummaryData &&
    gpsSummaryData.length > 0 &&
    (gpsSummaryData[0]?.averageSpeed === 0 ||
      gpsSummaryData[0]?.averageSpeed === 'NaN');

  const averageSpeed = !shouldCalculateAverageSpeed
    ? (gpsSummaryData[0]?.averageSpeed * 1.852).toFixed(2)
    : calculateAverageSpeed();

  if (initialLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={backgroundColorNew} />
      </View>
    );
  }

  const onRefresh = () => {
    setRefreshing(true);
    if (gpsTokenData) {
      dispatch(
        fetchSummaryReportRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          deviceId,
          from,
          to,
          false,
        ),
      );
      dispatch(
        fetchGpsTripsRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          deviceId,
          from,
          to,
        ),
      );
    }
    setRefreshing(false);
  };

  const renderContentOrShimmer = relevantData => {
    if (gpsTripsLoading) {
      console.log('-------------gpsTripsLoading--------------');
      return (
        <View>
          <MyLorryShimmer />
          <MyLorryShimmer />
          <MyLorryShimmer />
        </View>
      );
    }

    if (relevantData?.length === 0) {
      console.log('-------------relevantData?.length--------------');
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <NotFound
            imageName={'noLoadFound'}
            height={200}
            width={200}
            title={'No Load Found'}
          />
        </ScrollView>
      );
    }

    return (
      <View>
        <FlatList
          data={relevantData}
          renderItem={renderItem}
          keyExtractor={(item, _index) => _index.toString()}
          ListEmptyComponent={
            <View style={styles.noDataView}>
              <Text style={styles.locHistorynoDataText}>
                {t(Constants.NO_TRIPS)}
              </Text>
            </View>
          }
          style={styles.tableContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  };

  const ActiveTab = () => {
    const relevantData = Array.isArray(gpsTripsData)
      ? gpsTripsData.filter(data => data)
      : [];
    console.log('---------ActiveTab--------', relevantData);
    return renderContentOrShimmer(relevantData);
  };

  const InactiveTab = () => {
    const relevantData = Array.isArray(gpsTripsData)
      ? gpsTripsData.filter(data => data)
      : [];
    console.log('---------InactiveTab--------', relevantData);
    return renderContentOrShimmer(relevantData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.locHistoryHeaderBox}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.locHistoryTimeText}>{t(Constants.TRIP_SUM)}</Text>
          <Text style={styles.locHistoryTimeText}>
            {t(Constants.VEHICLE_NUM)}
            <Text style={styles.vehicleNumberText}>{name}</Text>
          </Text>
        </View>
        <View style={styles.summaryContainer}>
          <StopBox
            label={t(Constants.TOT_DIS)}
            value={
              gpsSummaryData && gpsSummaryData.length > 0
                ? `${(gpsSummaryData[0]?.distance / 1000).toFixed(2)} KM`
                : '0.00 KM'
            }
          />
          <StopBox
            label={t(Constants.AVG_SPEED)}
            value={`${averageSpeed} KM/H`}
          />
          <View style={styles.iconButtonsContainer}>
            <TouchableOpacity
              style={styles.downloadIconBox}
              onPress={handleDownload}>
              <DownloadIcon size={20} />
            </TouchableOpacity>
            {/* to be done */}
            <TouchableOpacity
              style={styles.locHistoryCalendarIconBox}
              onPress={() =>
                navigation.navigate('quickfilters', {
                  deviceId,
                  name,
                  navigationPath: 'LocationHistory',
                })
              }>
              <CalendarIcon size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.tabView}>
        <TabView
          navigationState={{
            index,
            routes: [
              {key: 'history', title: 'History'},
              {key: 'stops', title: 'Stops'},
            ],
          }}
          renderScene={SceneMap({history: HistoryTab, stops: StopsTab})}
          onIndexChange={setIndex}
          renderTabBar={RenderTabBar}
        />
      </View>
    </View>
  );
};

export default LocationHistory;
