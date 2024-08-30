import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect} from '@react-navigation/native';
import * as Constants from '../../Constants/Constant';
import DashboardHeader from '../../Components/DashboardHeader';
import GpsItem from '../../Components/GpsItem';
import {
  fetchGpsDevicesRequest,
  fetchTokenRequest,
  initProfile,
} from '../../Store/Actions/Actions';
import {backgroundColorNew, textColor, titleColor} from '../../Color/color';
import InnerButton from '../../Components/InnerButton';
import {websocketConnect} from '../../Store/Actions/WebSocketActions';

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
    DashboardUser,
    dashboardLoading,
  } = useSelector(state => state.data);

  const {wsConnected} = useSelector(state => {
    console.log('WEBSOCKET My Gps Screen---', state.wsData);
    return state.wsData;
  });

  const [mergedDeviceData, setMergedDeviceData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch GPS data
  const fetchGpsData = useCallback(() => {
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
  }, [dispatch, gpsTokenData]);

  // Manual refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGpsData();
    setRefreshing(false);
  }, [fetchGpsData]);

  // Auto-refresh when wsConnected is false
  useEffect(() => {
    if (!wsConnected) {
      const interval = setInterval(() => {
        fetchGpsData();
      }, 5000); // Auto-refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [wsConnected, fetchGpsData]);

  // Initial fetch on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchGpsData();
      if (!DashboardUser) {
        dispatch(initProfile());
      }
      return () => {
        Snackbar.dismiss();
      };
    }, [dispatch, fetchGpsData, DashboardUser]),
  );

  useEffect(() => {
    if (wsError) {
      Snackbar.show({
        text: 'Please Wait while Connecting to GPS',
        duration: Snackbar.LENGTH_LONG,
        fontFamily: 'PlusJakartaSans-SemiBold',
        textColor: '#000000',
        backgroundColor: '#FFD7CC',
      });
    }
  }, [wsError]);

  // Merge GPS data with WebSocket data
  const mergeDeviceData = useCallback(
    (devices = [], latestDevices = [], positions = [], events = []) => {
      const deviceMap = new Map();

      devices.forEach(device => {
        deviceMap.set(device.id, {...device});
      });

      latestDevices.forEach(latest => {
        if (deviceMap.has(latest.id)) {
          deviceMap.set(latest.id, {
            ...deviceMap.get(latest.id),
            ...latest,
          });
        }
      });

      positions.forEach(position => {
        if (deviceMap.has(position.deviceId)) {
          const device = deviceMap.get(position.deviceId);
          device.position = device.position
            ? [...device.position, position]
            : [position];
          deviceMap.set(position.deviceId, device);
        }
      });

      events.forEach(event => {
        if (deviceMap.has(event.deviceId)) {
          const device = deviceMap.get(event.deviceId);
          device.events = device.events ? [...device.events, event] : [event];
          deviceMap.set(event.deviceId, device);
        }
      });

      return Array.from(deviceMap.values()).map(device => {
        device.position = device.position || [];
        device.events = device.events || [];
        return device;
      });
    },
    [],
  );

  // Update merged device data when data changes
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

  // Memoized render function for GpsItem
  const renderGpsItem = useMemo(
    () =>
      ({item}) =>
        (
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
    <View style={styles.container}>
      <View style={styles.dashboardHeaderView}>
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
      <View style={styles.contentContainer}>
        {gpsDeviceLoading ? (
          <View style={styles.loadingStyle}>
            <ActivityIndicator size="large" color={backgroundColorNew} />
          </View>
        ) : gpsDeviceData === null ? (
          <View style={styles.notFoundView}>
            <Image
              source={require('../../../assets/noGps.png')}
              resizeMode="contain"
              style={styles.splashImage(250, 250)}
            />
            <Text style={styles.notFoundText}>No GPS available!</Text>
          </View>
        ) : (
          <FlatList
            data={mergedDeviceData}
            initialNumToRender={6}
            showsVerticalScrollIndicator={false}
            renderItem={renderGpsItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <View style={styles.homeView}>
                <View style={styles.notFoundView}>
                  <Image
                    source={require('../../../assets/noGps.png')}
                    resizeMode="contain"
                    style={styles.splashImage(250, 250)}
                  />
                  <Text style={styles.notFoundText}>No GPS available!</Text>
                  <Text style={styles.subText}>
                    Get a GPS Plan for your vehicle
                  </Text>
                </View>
                <View style={styles.getNowView}>
                  <Text style={styles.offerText}>Buy and save up to 50%</Text>
                  <InnerButton
                    navigation={() => navigation.navigate('BuyGPS')}
                    title={'Get Now'}
                    enabledStyle={styles.btnStyle}
                    textStyle={styles.btnText}
                  />
                </View>
              </View>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default MyGpsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashboardHeaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    maxHeight: 60,
    padding: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 60,
    padding: 10,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#707070',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
  },

  btnStyle: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#3CA604',
    borderColor: '#3CA604',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    color: textColor,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  homeView: {
    flex: 1,
    marginVertical: 60,
    justifyContent: 'center',
  },
  notFoundView: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getNowView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
  },
  offerText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#3BA700',
    textAlign: 'center',
    paddingVertical: 10,
  },
  splashImage: (height, width) => ({
    height: height,
    width: width,
  }),
  subText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    marginTop: 15,
  },
});
