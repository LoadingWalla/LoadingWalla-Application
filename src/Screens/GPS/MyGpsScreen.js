import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import DashboardHeader from '../../Components/DashboardHeader';
import {backgroundColorNew, textColor, titleColor} from '../../Color/color';
import Button from '../../Components/Button';
import {
  fetchGpsDevicesRequest,
  fetchTokenFailure,
  fetchTokenRequest,
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/Actions';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect} from '@react-navigation/native';
import GpsItem from '../../Components/GpsItem';

const MyGpsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {
    gpsTokenData,
    gpsDeviceLoading,
    gpsDeviceData,
    wsPositions,
    wsDevices,
    wsEvents,
    wsError,
    wsConnected,
    DashboardUser,
    dashboardLoading,
  } = useSelector(state => {
    console.log('GpsTrackings', state.data);
    return state.data;
  });

  const [mergedDeviceData, setMergedDeviceData] = useState([]);

  useEffect(() => {
    if (gpsTokenData) {
      const {cookie, email, password} = gpsTokenData;
      // console.log(77777, gpsTokenData);
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
  }, [dispatch, gpsTokenData]);

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
    <View style={{flex: 1}}>
      <View style={styles.DashboardHeaderView}>
        <DashboardHeader
          img={DashboardUser?.profile_img}
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          notification={() => navigation.navigate('Notification')}
          isDashboard={true}
          title={DashboardUser?.name}
          gotoProfile={() => navigation.navigate(t(Constants.MENU))}
          navigate={() => navigation?.navigate('Contactus')}
          loading={dashboardLoading}
          wallet={DashboardUser?.wallet}
          verify={DashboardUser?.verify}
          t={t}
        />
      </View>
      <View style={{flex: 1, marginVertical: 60}}>
        <View style={styles.container}>
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
            style={styles.btnStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default MyGpsScreen;

const styles = StyleSheet.create({
  DashboardHeaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    maxHeight: 60,
    padding: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
  },
  container: {
    padding: 10,
    flex: 1,
  },
  headerContainer: {
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    paddingLeft: 10,
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAddressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAddressText: {
    fontSize: 16,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
