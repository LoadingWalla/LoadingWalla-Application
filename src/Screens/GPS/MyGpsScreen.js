import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
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
import {websocketConnect} from '../../Store/Actions/WebSocketActions';
import EmptyListComponent from '../../Components/EmptyListComponent';
import SearchBox from '../../Components/SearchBox';

const MyGpsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {
    gpsTokenData,
    gpsDeviceLoading,
    gpsDeviceData,
    DashboardUser,
    dashboardLoading,
  } = useSelector(state => {
    // console.log('My Gps Screen---', state.data);
    return state.data;
  });

  const {wsConnected, wsPositions, wsDevices, wsEvents, wsError} = useSelector(
    state => {
      // console.log('WEBSOCKET My Gps Screen---', state.wsData);
      return state.wsData;
    },
  );

  const [mergedDeviceData, setMergedDeviceData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

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

  // Filter data using useMemo to avoid unnecessary re-renders
  const filteredDeviceData = useMemo(() => {
    let filtered = mergedDeviceData;

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(device =>
        device.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Apply status filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter(device =>
        filterStatus === 'Active'
          ? device.status === 'online'
          : device.status === 'offline',
      );
    }

    return filtered;
  }, [mergedDeviceData, searchText, filterStatus]);

  // Handle filter change
  const handleFilterChange = value => {
    setFilterStatus(value);
  };

  // Handle search
  const handleSearch = text => {
    setSearchText(text);
  };

  // Handle toggle of search box
  const handleToggleSearch = isExpanded => {
    if (!isExpanded) {
      setSearchText('');
      setFilterStatus('All');
    }
  };

  const renderGpsItem = useCallback(
    ({item}) => <GpsItem item={item} icon={true} navigation={navigation} />,
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
        <SearchBox
          onSearch={handleSearch}
          onToggle={handleToggleSearch}
          onFilterChange={handleFilterChange}
        />
        {gpsDeviceLoading ? (
          <View style={styles.loadingStyle}>
            <ActivityIndicator size="large" color={backgroundColorNew} />
          </View>
        ) : gpsDeviceData === null ? (
          <View />
        ) : (
          <FlatList
            data={filteredDeviceData}
            initialNumToRender={4}
            maxToRenderPerBatch={5}
            windowSize={5}
            showsVerticalScrollIndicator={false}
            renderItem={renderGpsItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              filteredDeviceData.length === 0 ? (
                <EmptyListComponent navigation={navigation} />
              ) : null
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
