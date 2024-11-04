import React, {useCallback, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearGpsDeviceData,
  clearGpsStopsData,
  fetchAddressFailure,
  fetchCombinedGpsDataRequest,
  fetchGpsStopsRequest,
  gpsRelayFailure,
  gpsRelayRequest,
} from '../../Store/Actions/Actions';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import styles from './style';
import MapComponent from '../../Components/MapComponent';
import BottomSwipeUpContainer from '../../Components/BottomSwipeUpContainer';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const getFilteredPositions = (wsMessages22, deviceId) => {
  return wsMessages22.positions.filter(
    position => position.deviceId === deviceId,
  );
};

const TrackingTruck = ({navigation, route}) => {
  useTrackScreenTime('TrackingTruck');
  const {item, lat, long, deviceId} = route.params;
  // console.log(11111, 'TrackingTruck Params ------>', route);

  const {
    gpsTokenData,
    gpsRelayData,
    gpsRoutesData,
    gpsCombinedData,
    gpsStopsData,
  } = useSelector(state => {
    // console.log('Tracking Truck -------------->>>>>', state.data);
    return state.data;
  });
  const {wsMessages22} = useSelector(state => {
    console.log(
      'WEBSOCKET TrackingTruck -------------->>>>>',
      state.wsData.wsMessages22,
    );
    return state.wsData;
  });

  const dispatch = useDispatch();

  const fetchRoutes = useCallback(() => {
    if (gpsTokenData && deviceId) {
      const defaultFrom = moment().utcOffset(330).startOf('day').toISOString();
      const defaultTo = moment().utcOffset(330).endOf('day').toISOString();
      // console.log(100000, '------------>>>>', deviceId, defaultFrom, defaultTo);

      dispatch(
        fetchCombinedGpsDataRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
        ),
      );
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
  }, [dispatch, gpsTokenData, deviceId]);

  useFocusEffect(
    useCallback(() => {
      fetchRoutes();
    }, [fetchRoutes]),
  );

  useEffect(() => {
    dispatch(gpsRelayRequest(deviceId));
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      // dispatch(gpsRelayRequest(deviceId));
      return () => {
        dispatch(fetchAddressFailure());
        dispatch(clearGpsDeviceData());
        dispatch(gpsRelayFailure());
        dispatch(clearGpsStopsData());
        // dispatch(clearCombinedGpsData());
      };
    }, []),
  );

  const filteredPositions = useMemo(() => {
    return getFilteredPositions(wsMessages22, deviceId);
  }, [wsMessages22, deviceId]);

  const gpsDataAvailable = useMemo(
    () => gpsCombinedData?.[0] || {},
    [gpsCombinedData],
  );
  const routeData = gpsDataAvailable.route || [];
  const eventData = gpsDataAvailable.events || [];

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapComponent
          initialRegion={{
            latitude: lat,
            longitude: long,
          }}
          item={item}
          positions={filteredPositions}
          navigation={navigation}
          // routeData={gpsRoutesData}
          routeData={routeData}
          eventData={eventData}
          stopsData={gpsStopsData}
        />
      </View>
      <BottomSwipeUpContainer
        navigation={navigation}
        latitude={lat}
        longitude={long}
        item={item}
        positions={filteredPositions}
        gpsRelayData={gpsRelayData}
      />
    </View>
  );
};

export default TrackingTruck;
