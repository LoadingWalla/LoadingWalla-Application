import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect} from '@react-navigation/native';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import {
  fetchGpsDevicesRequest,
  fetchTokenRequest,
  initProfile,
} from '../../Store/Actions/Actions';
import {GradientColor1, GradientColor5} from '../../Color/color';
import {websocketConnect} from '../../Store/Actions/WebSocketActions';
import GpsItem from '../../Components/GpsItem';
import DashboardHeader from '../../Components/DashboardHeader';
import SearchBox from '../../Components/SearchBox';
import EmptyListComponent from '../../Components/EmptyListComponent';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import {AnimatedFAB} from 'react-native-paper';
import AddIcon from '../../../assets/SVG/svg/AddIcon';
import MyGPSShimmer from '../../Components/Shimmer/MyGPSShimmer';

const MyGpsScreen = ({navigation}) => {
  useTrackScreenTime('MyGpsScreen');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {
    gpsTokenData,
    gpsDeviceLoading,
    gpsDeviceData,
    DashboardUser,
    dashboardLoading,
  } = useSelector(state => state.data);

  const {wsConnected, wsPositions, wsDevices, wsEvents, wsError} = useSelector(
    state => {
      // console.log('-----------------MyGpsScreen Message22-----------------', state.wsData);
      return state.wsData;
    },
  );

  const [mergedDeviceData, setMergedDeviceData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  // const fabStyle = {[animateFrom]: 16};

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

      setFilterStatus('All');

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

  const deviceCounts = useMemo(() => {
    const all = mergedDeviceData.length;
    const active = mergedDeviceData.filter(
      device => device.status === 'online',
    ).length;
    const inactive = mergedDeviceData.filter(
      device => device.status === 'offline',
    ).length;
    const running = mergedDeviceData.filter(
      device => device.position[0]?.attributes?.motion === true,
    ).length;
    return {all, active, inactive, running};
  }, [mergedDeviceData]);

  const filteredDeviceData = useMemo(() => {
    let filtered = mergedDeviceData;

    if (searchText) {
      filtered = filtered.filter(device =>
        device.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    if (filterStatus !== 'All') {
      if (filterStatus === 'Active') {
        filtered = filtered.filter(device => device.status === 'online');
      } else if (filterStatus === 'Inactive') {
        filtered = filtered.filter(device => device.status === 'offline');
      } else if (filterStatus === 'Running') {
        filtered = filtered.filter(
          device => device.position[0]?.attributes?.motion === true,
        );
      }
    }
    return filtered;
  }, [mergedDeviceData, searchText, filterStatus]);

  const handleFilterChange = value => {
    setFilterStatus(value);
  };

  const handleSearch = text => {
    setSearchText(text);
  };

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
    <View style={styles.myGpsContainer}>
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
      <View style={styles.gpsDataStyle}>
        {gpsDeviceLoading ? (
          <View>
            <MyGPSShimmer />
          </View>
        ) : gpsDeviceData === null ? (
          <View />
        ) : (
          <>
            <SearchBox
              onSearch={handleSearch}
              onToggle={handleToggleSearch}
              onFilterChange={handleFilterChange}
              deviceCounts={deviceCounts}
              onRefresh={onRefresh}
            />
            <FlatList
              data={filteredDeviceData.slice().reverse()}
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
              onScroll={onScroll}
            />
          </>
        )}
      </View>
      <AnimatedFAB
        icon={() => <AddIcon size={35} color={GradientColor5} />}
        label={'Buy Now'}
        extended={isExtended}
        onPress={() => navigation.navigate('BuyGPS')}
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle]}
        uppercase={false}
        color={GradientColor5}
        rippleColor={GradientColor1}
      />
    </View>
  );
};

export default MyGpsScreen;
