import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {backgroundColorNew, titleColor} from '../../Color/color';
import {AnimatedRegion} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import {
  fetchAddressFailure,
  fetchAddressRequest,
  fetchPositionsRequest,
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
  const {gpsReplayData, gpsTokenData, gpsRelayData, fullAddressData} =
    useSelector(state => {
      console.log('Tracking Truck -------------->>>>>', state.data);
      return state.data;
    });
  const {
    wsMessages,
    wsConnected,
    wsDevices,
    wsPositions,
    wsEvents,
    wsMessages22,
  } = useSelector(state => {
    console.log('WEBSOCKET Tracking Truck -------------->>>>>', state.wsData);
    return state.wsData;
  });

  const [filteredPositions, setFilteredPositions] = useState([]);
  useEffect(() => {
    // Filter positions whenever wsMessages22 or deviceId changes
    const positions = getFilteredPositions(wsMessages22, deviceId);
    setFilteredPositions(positions);
  }, [wsMessages22, deviceId]);

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
