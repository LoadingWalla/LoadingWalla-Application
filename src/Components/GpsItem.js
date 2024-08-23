import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {PrivacyPolicy, backgroundColorNew, titleColor} from '../Color/color';
import SettingIcon from '../../assets/SVG/svg/SettingIcon';
import FuelIcon from '../../assets/SVG/svg/FuelIcon';
import BatteryIcon from '../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../assets/SVG/svg/NetworkIcon';
import GeoFencingIcon from '../../assets/SVG/svg/GeoFencingIcon';
import AlertBox from './AlertBox';
import AlertIcon from '../../assets/SVG/AlertIcon';
import ToggleIconText from './ToggleIconText';
import moment from 'moment';
import LocationShadowIcon from '../../assets/SVG/svg/LocationShadowIcon';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAddressRequest} from '../Store/Actions/Actions';
import {useFocusEffect} from '@react-navigation/native';
import VehicleIcon from './GpsVehicleIcon';

const GpsItem = ({navigation, item, icon, isDisable}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [fullAddress, setFullAddress] = useState('Show Full Address');
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  console.log(66666, item);

  const {position = [], status, name, disabled, id, lastUpdate} = item;
  const attributes = position[0]?.attributes || {};
  const {
    ignition,
    motion,
    distance,
    batteryLevel,
    alarm,
    fuel,
    geofence,
    network,
    charge,
  } = attributes;

  const isNavigationDisabled =
    disabled || position.length === 0 || position[0].latitude === undefined;
  const showAlert = message => {
    AlertBox(message);
  };

  const handlePress = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderStatus = () => {
    if (status === 'online') {
      return <Text style={styles.ignitionText(true)}>Active</Text>;
    }
    if (status === 'offline') {
      return <Text style={styles.ignitionText(false)}>Inactive</Text>;
    }
    return (
      <Text style={styles.lastUpdateText}>{moment(lastUpdate).fromNow()}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.imgContainer}>
          <View style={styles.imgBox}>
            <Image
              source={{
                uri: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
              }}
              style={styles.image}
            />
            {/* <VehicleIcon category={item.category} size={50} color="#000" /> */}
          </View>
        </View>
        <TouchableOpacity
          disabled={isDisable}
          onPress={() => {
            if (isNavigationDisabled) {
              showAlert(
                disabled
                  ? 'Service unavailable! Your Plan has been Expired.'
                  : 'Wait! GPS Network Error.',
              );
            } else {
              navigation.navigate('trackingtruck', {
                deviceId: id,
                lat: position[0]?.latitude,
                long: position[0]?.longitude,
                item,
              });
            }
          }}
          style={styles.textContainer}>
          <Text style={styles.highlightText}>{name}</Text>
          <View style={styles.ignBox}>
            {renderStatus()}
            <View style={styles.verticalLine} />
            <View style={styles.row}>
              <Text style={styles.distanceText}>Ignition</Text>
              <Text
                style={[
                  styles.ignitionText(ignition || motion),
                  {marginLeft: 5, textTransform: 'uppercase'},
                ]}>
                {ignition || motion ? 'on' : 'off'}
              </Text>
            </View>
          </View>
          <View style={styles.iconBox}>
            <View style={styles.iconRow}>
              <BatteryIcon
                size={15}
                color={
                  batteryLevel
                    ? batteryLevel > 60
                      ? 'green'
                      : 'red'
                    : '#727272'
                }
                charge={charge}
                batteryLevel={batteryLevel}
              />
              {network !== null && <NetworkIcon color={'green'} size={14} />}
            </View>
            <View style={styles.iconRow}>
              {alarm && (
                <ToggleIconText
                  IconComponent={AlertIcon}
                  text={alarm}
                  iconSize={15}
                  color={backgroundColorNew}
                  index={2}
                  activeIndex={activeIndex}
                  activeText={false}
                  onPress={() => handlePress(2)}
                />
              )}
              {fuel && <FuelIcon size={15} color={'#727272'} />}
              {geofence && <GeoFencingIcon size={15} />}
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.distanceBox}>
            <Text style={styles.highlightText}>{`${(
              item.distance / 1000
            ).toFixed(2)} KM`}</Text>
            <Text style={styles.distanceText}>Today Distance</Text>
            <Text style={[styles.ignitionText(motion), {textAlign: 'left'}]}>
              {motion ? 'Running' : 'Stopped'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#F7F7F7',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 8,
          flexDirection: 'column',
        }}>
        <View style={styles.expiryDate}>
          <View style={styles.addressContainer}>
            <LocationShadowIcon size={15} color={'#3BA700'} />
            <Text style={styles.addressText(false)}>{item.address}</Text>
          </View>
          <TouchableOpacity
            style={styles.center}
            disabled={isDisable}
            onPress={() => {
              if (isNavigationDisabled) {
                showAlert(
                  disabled
                    ? 'Service unavailable! Your Plan has been Expired.'
                    : 'Wait! GPS Network Error.',
                );
              } else {
                navigation.navigate('GpsSetting', {deviceId: id});
              }
            }}>
            <SettingIcon size={15} color={backgroundColorNew} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: PrivacyPolicy,
            fontFamily: 'PlusJakartaSans-SemiBold',
            fontSize: 8,
            paddingLeft: 25,
          }}>
          {moment(item?.lastUpdate).format('hh:mm A DD MMM YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default GpsItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    // borderTopLeftRadius: 0,
    marginBottom: 20,
    elevation: 2,
    // shadowColor: 'blue',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    // padding: 10,
    // borderWidth: 1,
    paddingTop: 8,
  },
  highlightText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  distanceBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#f7f7f7',
  },
  distanceText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    textAlign: 'right',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    minWidth: 180,
    // borderWidth: 1,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 5,
    marginTop: 2,
    height: '80%',
  },
  ignBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imgBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    width: 65,
    height: 60,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignitionText: status => ({
    color: status ? 'green' : 'red',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
  }),
  addressText: color => ({
    color: color ? backgroundColorNew : PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-BoldItalic',
    fontSize: 10,
    marginLeft: 10,
  }),
  inactiveText: {
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
  lastUpdateText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
  },
  expiryDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 40,
    marginRight: 8,
    // borderWidth: 1,
  },
  addressContainer: {
    maxWidth: '90%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
