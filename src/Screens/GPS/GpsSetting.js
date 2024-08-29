import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {textColor} from '../../Color/color';
import GpsSettingItem from '../../Components/GpsSettingItem';
import Button from '../../Components/Button';
import {useFocusEffect} from '@react-navigation/native';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import {websocketConnect} from '../../Store/Actions/WebSocketActions';

const GpsSetting = ({navigation, route}) => {
  const {deviceId} = route.params;
  const dispatch = useDispatch();

  const {gpsTokenData, gpsDeviceData} = useSelector(state => {
    console.log('Gps Setting -------------------', state.data);
    return state.data;
  });

  const deviceData = gpsDeviceData?.find(device => device.id === deviceId);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(websocketDisconnect());
      return () => {
        dispatch(websocketConnect(gpsTokenData?.cookie));
      };
    }, [dispatch, gpsTokenData]),
  );

  const handlePress = () => {
    Toast.show('Settings saved', Toast.LONG);
  };

  if (!deviceData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Device data not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.textStyle}>{deviceData.name}</Text>
        <View style={styles.iconBox}>
          <GpsIcon2 size={30} color={'green'} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GpsSettingItem detailInput={false} title={'Ignition on'} />
        <GpsSettingItem detailInput={false} title={'Ignition off'} />
        <GpsSettingItem detailInput={false} title={'Speed limit exceeded'} />
        <GpsSettingItem detailInput={false} title={'Device moving'} />
        <GpsSettingItem detailInput={false} title={'Geofence entered'} />
        <GpsSettingItem detailInput={false} title={'Geofence exited'} />
      </ScrollView>
      <View>
        <Button
          title={'Save'}
          textStyle={styles.btnText}
          style={styles.btnStyle}
          onPress={handlePress}
        />
        <TouchableOpacity
          style={styles.gpsInfo}
          onPress={() => navigation.navigate('ownedGPS', {deviceId})}>
          <Text style={styles.gpsInfoText}>GPS Info!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GpsSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerBox: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 5,
  },
  iconBox: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
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
  gpsInfo: {alignItems: 'center', marginVertical: 5},
  gpsInfoText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
    color: 'blue',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
