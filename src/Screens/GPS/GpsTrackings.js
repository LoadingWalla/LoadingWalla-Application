import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import GpsItem from '../../Components/GpsItem';
import Button from '../../Components/Button';
import {backgroundColorNew, textColor} from '../../Color/color';
import {
  fetchGpsDevicesRequest,
  fetchTokenFailure,
  fetchTokenRequest,
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const GpsTrackings = ({navigation}) => {
  const dispatch = useDispatch();
  const latestDevice = useSelector(state => state.data.wsDevices);
  const allPositions = useSelector(state => state.data.wsPositions);
  const allEvents = useSelector(state => state.data.wsEvents);
  // console.log(444, allPositions);

  const {
    gpsTokenLoading,
    gpsTokenData,
    gpsTokenStatus,
    gpsDeviceLoading,
    gpsDeviceData,
    gpsDeviceStatus,
    wsMessages,
  } = useSelector(state => {
    console.log('Gps Tracking', state.data);
    return state.data;
  });

  useEffect(() => {
    if (gpsTokenData) {
      const cookie = gpsTokenData.cookie;
      dispatch(websocketConnect(cookie));
      dispatch(
        fetchGpsDevicesRequest(gpsTokenData.email, gpsTokenData.password),
      );
    } else {
      dispatch(fetchTokenRequest());
    }
  }, [dispatch, gpsTokenData]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('WebSocket disconnecting on screen leave');
        dispatch(websocketDisconnect());
        dispatch(fetchTokenFailure());
      };
    }, [dispatch]),
  );

  // Merge gpsDeviceData with latestDevice, positions, and events
  const mergedDeviceData = gpsDeviceData?.map(device => {
    const latest = latestDevice.find(d => d.id === device.id);
    const position = allPositions.filter(p => p.deviceId === device.id);
    const events = allEvents.filter(e => e.deviceId === device.id);
    // console.log(
    //   55555,
    //   latest ? {...device, ...latest, position, events} : device,
    // );
    return latest
      ? {...device, ...latest, position, events}
      : {...device, position, events};
  });

  return (
    <View style={styles.conatiner}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>GPS Purchases</Text>
      </View>
      {gpsDeviceLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size={'large'} color={backgroundColorNew} />
        </View>
      ) : (
        <FlatList
          data={mergedDeviceData}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <GpsItem item={item} icon={true} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <Button
        title={'Buy GPS'}
        onPress={() => navigation.navigate('BuyGPS')}
        // loading={statusChangeLoading}
        textStyle={styles.btnText}
        style={styles.btnStyle}
      />
    </View>
  );
};

export default GpsTrackings;

const styles = StyleSheet.create({
  conatiner: {paddingHorizontal: 10, flex: 1},
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
  loadingStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
