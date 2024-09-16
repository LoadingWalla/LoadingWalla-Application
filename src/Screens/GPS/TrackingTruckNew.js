import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCombinedGpsData,
  clearGpsDeviceData,
  fetchAddressFailure,
  fetchCombinedGpsDataRequest,
  fetchRouteRequest,
  gpsRelayFailure,
  gpsRelayRequest,
} from '../../Store/Actions/Actions';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import MapComponent from './MapComponent';
import BottomSwipeUpContainer from './BottomSwipeUpContainer';

const getFilteredPositions = (wsMessages22, deviceId) => {
  return wsMessages22.positions.filter(
    position => position.deviceId === deviceId,
  );
};

const TrackingTruckNew = ({navigation, route}) => {
  const {item, name, lat, long, deviceId} = route.params;
  // console.log(11111, 'TrackingTruck Params ------>', route);

  const {gpsTokenData, gpsRelayData, gpsRoutesData, gpsCombinedData} =
    useSelector(state => {
      console.log('Tracking Truck -------------->>>>>', state.data);
      return state.data;
    });
  const {wsMessages22} = useSelector(state => {
    // console.log('WEBSOCKET Tracking Truck -------------->>>>>', state.wsData);
    return state.wsData;
  });

  const dispatch = useDispatch();

  const fetchRoutes = useCallback(() => {
    if (gpsTokenData && deviceId) {
      const defaultFrom = moment().utcOffset(330).startOf('day').toISOString();
      const defaultTo = moment().utcOffset(330).endOf('day').toISOString();
      console.log(100000, '------------>>>>', deviceId, defaultFrom, defaultTo);

      dispatch(
        fetchCombinedGpsDataRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
        ),
      );
      // dispatch(
      //   fetchRouteRequest(
      //     gpsTokenData?.email,
      //     gpsTokenData?.password,
      //     deviceId,
      //     defaultFrom,
      //     defaultTo,
      //   ),
      // );
    }
  }, [dispatch, gpsTokenData, deviceId]);

  useFocusEffect(
    useCallback(() => {
      fetchRoutes();
    }, [fetchRoutes]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(gpsRelayRequest(deviceId));
      return () => {
        dispatch(fetchAddressFailure());
        dispatch(clearGpsDeviceData());
        dispatch(gpsRelayFailure());
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
  const stopsData = gpsDataAvailable.positions || [];

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
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
          stopsData={stopsData}
        />
      </View>

      {/* <View style={styles.overlayContainer}>
        <TouchableOpacity
          style={styles.alertButton}
          onPress={() => navigation.navigate('GpsAlert')}>
          <AlertsIcon size={20} />
          <Text style={styles.alertButtonText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gpsButton} onPress={() => {}}>
          <GpsIcon2 size={20} />
        </TouchableOpacity>
      </View> */}
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

export default TrackingTruckNew;

const styles = StyleSheet.create({
  container: {flex: 1},
  mapContainer: {flex: 1},
  overlayContainer: {
    position: 'absolute',
    top: 50, // Adjust this value depending on where you want the children to appear
    left: 0,
    right: 0,
    zIndex: 2, // Ensure this is on top
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  alertButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    paddingVertical: 10,
  },
  alertButtonText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  gpsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
});
