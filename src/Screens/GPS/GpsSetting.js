import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GpsSettingItem from '../../Components/GpsSettingItem';
import Button from '../../Components/Button';
import {useFocusEffect} from '@react-navigation/native';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import {websocketConnect} from '../../Store/Actions/WebSocketActions';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const GpsSetting = ({navigation, route}) => {
  useTrackScreenTime('GpsSetting');
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
      <View style={styles.gpsSettingContainer}>
        <Text style={styles.errorText}>Device data not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.gpsSettingContainer}>
      <View style={styles.gpsSettingHeaderBox}>
        <Text style={styles.textStyle}>{deviceData.name}</Text>
        <View style={styles.gpsSettingIconBox}>
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
          style={styles.gpsSettingBtnStyle}
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
