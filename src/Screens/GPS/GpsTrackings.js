import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {
  fetchGpsDevicesRequest,
  fetchTokenFailure,
  fetchTokenRequest,
} from '../../Store/Actions/Actions';
import {
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/WebSocketActions';
import {useFocusEffect} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';
import GpsItem from '../../Components/GpsItem';
import Button from '../../Components/Button';
import {backgroundColorNew} from '../../Color/color';
import Snackbar from 'react-native-snackbar';
import styles from './style';

const GpsTrackings = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    gpsTokenData,
    gpsDeviceLoading,
    gpsDeviceData,
    wsPositions,
    wsDevices,
    wsEvents,
    wsError,
  } = useSelector(state => {
    console.log('GpsTrackings', state.data);
    return state.data;
  });
  const {wsConnected} = useSelector(state => state.wsData);

  const [mergedDeviceData, setMergedDeviceData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (gpsTokenData) {
        const {cookie, email, password} = gpsTokenData;
        dispatch(websocketConnect(cookie));
        dispatch(
          fetchGpsDevicesRequest(
            encodeURIComponent(email),
            encodeURIComponent(password),
          ),
        );
      } else {
        dispatch(fetchTokenRequest());
      }
    }, [dispatch, gpsTokenData]),
  );

  useEffect(() => {
    if (wsError) {
      Snackbar.show({
        text: 'Something Error in Connecting in GPS',
        duration: Snackbar.LENGTH_LONG,
        fontFamily: 'PlusJakartaSans-SemiBold',
        textColor: '#000000',
        backgroundColor: '#FFD7CC',
        // marginBottom: 70,
      });
    }
  }, [wsError]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // console.log('WebSocket disconnecting on screen leave');
        dispatch(websocketDisconnect());
        dispatch(fetchTokenFailure());
        Snackbar.dismiss();
      };
    }, [dispatch]),
  );

  const mergeDeviceData = React.useCallback(
    (devices = [], latestDevices = [], positions = [], events = []) => {
      const deviceMap = new Map();

      devices?.forEach(device => {
        deviceMap.set(device.id, {...device});
      });

      latestDevices?.forEach(latest => {
        if (deviceMap.has(latest.id)) {
          deviceMap.set(latest.id, {
            ...deviceMap.get(latest.id),
            ...latest,
          });
        }
      });

      positions?.forEach(position => {
        if (deviceMap.has(position.deviceId)) {
          const device = deviceMap.get(position.deviceId);
          device.position = device.position
            ? [...device.position, position]
            : [position];
          deviceMap.set(position.deviceId, device);
        }
      });

      events?.forEach(event => {
        if (deviceMap.has(event.deviceId)) {
          const device = deviceMap.get(event.deviceId);
          device.events = device.events ? [...device.events, event] : [event];
          deviceMap.set(event.deviceId, device);
        }
      });

      return Array.from(deviceMap.values()).map(device => {
        // Ensure device.position and device.events are always arrays
        device.position = device.position || [];
        device.events = device.events || [];
        return device;
      });
    },
    [],
  );

  useEffect(() => {
    if (gpsDeviceData) {
      const updatedData = mergeDeviceData(
        gpsDeviceData,
        wsDevices,
        wsPositions,
        wsEvents,
      );
      setMergedDeviceData(updatedData);
    }
  }, [gpsDeviceData, wsDevices, wsPositions, wsEvents, mergeDeviceData]);

  const renderGpsItem = React.useCallback(
    ({item}) => (
      <GpsItem
        item={item}
        icon={true}
        navigation={navigation}
        isDisable={!wsConnected}
      />
    ),
    [navigation, wsConnected],
  );

  return (
    <View style={styles.gpsTrackContainer}>
      {gpsDeviceLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="large" color={backgroundColorNew} />
        </View>
      ) : gpsDeviceData === null ? (
        <View style={styles.noAddressContainer}>
          <Text style={styles.noAddressText}>No GPS found.</Text>
        </View>
      ) : (
        <FlatList
          data={mergedDeviceData}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          renderItem={renderGpsItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <View style={styles.noAddressContainer}>
              <Text style={styles.noAddressText}>No GPS found.</Text>
            </View>
          }
        />
      )}
      <Button
        title="Buy GPS"
        onPress={() => navigation.navigate('BuyGPS')}
        textStyle={styles.btnText}
        style={styles.gpsTrackBtnStyle}
      />
    </View>
  );
};

export default GpsTrackings;
