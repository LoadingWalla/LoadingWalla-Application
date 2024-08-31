import React, {useState, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PrivacyPolicy, backgroundColorNew, titleColor} from '../Color/color';
import FuelIcon from '../../assets/SVG/svg/FuelIcon';
import BatteryIcon from '../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../assets/SVG/svg/NetworkIcon';
import GeoFencingIcon from '../../assets/SVG/svg/GeoFencingIcon';
import AlertBox from './AlertBox';
import AlertIcon from '../../assets/SVG/AlertIcon';
import ToggleIconText from './ToggleIconText';
import moment from 'moment';
import VehicleIcon from './GpsVehicleIcon';
import RelayIcon from '../../assets/SVG/svg/RelayIcon';

const GpsItem = ({navigation, item, isDisable}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  console.log(4444, item);

  const {position = [], status, name, disabled, id, lastUpdate} = item;
  const attributes = position[0]?.attributes || {};
  const {
    ignition,
    motion,
    batteryLevel,
    alarm,
    fuel,
    geofence,
    network,
    charge,
  } = attributes;

  const isNavigationDisabled =
    disabled || position.length === 0 || !position[0]?.latitude;

  const showAlert = message => AlertBox(message);

  const handlePress = index =>
    setActiveIndex(activeIndex === index ? null : index);

  const renderStatus = () => {
    if (status === 'online') {
      return <Text style={styles.ignitionText(true)}>GPS Active</Text>;
    }
    if (status === 'offline') {
      return <Text style={styles.ignitionText(false)}>GPS Inactive</Text>;
    }
    return (
      <Text style={styles.lastUpdateText}>{moment(lastUpdate).fromNow()}</Text>
    );
  };

  const handleNavigation = () => {
    if (isNavigationDisabled) {
      showAlert(
        disabled
          ? 'Service unavailable! Your Plan has been Expired.'
          : 'Wait! GPS Network Error.',
      );
    } else {
      navigation.navigate('trackingtruck', {
        deviceId: id,
        name,
        lat: position[0]?.latitude,
        long: position[0]?.longitude,
        item,
      });
    }
  };

  return (
    <View
      style={{marginBottom: 20, backgroundColor: '#FFE5DE', borderRadius: 8}}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.imgContainer}>
            <View style={styles.imgBox}>
              <VehicleIcon
                category={item.category || 'default'}
                size={50}
                color="#000"
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity
              disabled={isDisable}
              onPress={handleNavigation}
              style={styles.textViewContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginBottom: 4,
                }}>
                <Text style={styles.highlightText}>{name}</Text>
                <Text
                  style={[
                    styles.ignitionText(motion),
                    {textAlign: 'left', marginLeft: 10},
                  ]}>
                  {motion ? '(Running)' : '(Stopped)'}
                </Text>
              </View>

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
            </TouchableOpacity>
            <View style={styles.iconBox}>
              <View style={styles.iconRow}>
                <BatteryIcon
                  size={15}
                  color={batteryLevel > 60 ? 'green' : 'red' || '#727272'}
                  charge={charge}
                  batteryLevel={batteryLevel}
                />
                {network !== null && <NetworkIcon color={'green'} size={14} />}
              </View>
              <View style={styles.hiddenIconRow}>
                {item?.relay && <RelayIcon size={14} color={'green'} />}
                {alarm && (
                  <ToggleIconText
                    IconComponent={AlertIcon}
                    text={alarm}
                    iconSize={15}
                    color={backgroundColorNew}
                    index={2}
                    activeIndex={activeIndex}
                    activeText={true}
                    onPress={() => handlePress(2)}
                  />
                )}
                {fuel && <FuelIcon size={15} color="#727272" />}
                {geofence && <GeoFencingIcon size={15} />}
              </View>
            </View>
          </View>
          {/* <View style={styles.distanceBox}>
          <Text style={styles.highlightText}>{`${(item.distance / 1000).toFixed(
            2,
          )} KM`}</Text>
          <Text style={styles.distanceText}>Today Distance</Text>
          <Text style={[styles.ignitionText(motion), {textAlign: 'left'}]}>
            {motion ? 'Running' : 'Stopped'}
          </Text>
        </View> */}
          <View style={styles.distanceBox}>
            <Text style={styles.speedText(motion)}>
              {Math.ceil(item?.position[0]?.speed)}
            </Text>
            <Text style={styles.distanceText}>KM/H</Text>
          </View>
        </View>
        <View style={styles.additionalInfoContainer}>
          <View style={styles.expiryDate}>
            <View style={styles.addressContainer}>
              {/* <LocationShadowIcon size={15} color="#3BA700" /> */}
              <Text style={styles.addressText(false)}>{item.address}</Text>
            </View>
            {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          </View>
          {/* <Text style={styles.lastUpdate}>
          {moment(item?.lastUpdate).format('hh:mm A DD MMM YYYY')}
        </Text> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 7,
          paddingHorizontal: 10,
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            color: titleColor,
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 12,
          }}>
          {moment(item?.lastUpdate).format('MMM DD, YYYY hh:mm A')}
        </Text>
        <View style={styles.verticalLine} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Text
            style={{
              color: titleColor,
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 12,
            }}>
            Today Distance:
          </Text>
          <Text
            style={{
              textAlign: 'left',
              marginLeft: 5,
              color: titleColor,
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 12,
            }}>{`${(item.distance / 1000).toFixed(2)} KM`}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(GpsItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // marginBottom: 20,
    elevation: 2,
    // borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  imgContainer: {
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imgBox: {
    backgroundColor: '#ededed',
    borderRadius: 6,
    width: 65,
    height: 60,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,
    // borderWidth: 1,
  },
  textViewContainer: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: 8,
    // borderWidth: 1,
  },
  highlightText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
    // marginBottom: 4,
  },
  speedText: color => ({
    color: color ? '#3BA700' : '#FF0000',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  }),
  distanceBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#EFEFEF',
    // borderWidth: 1,
    maxWidth: 50,
    maxHeight: 50,
    padding: 10,
  },
  distanceText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    textAlign: 'center',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    minWidth: 180,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 1,
    marginHorizontal: 10,
    marginTop: 2,
    height: '80%',
  },
  ignBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    // borderWidth: 1,
  },
  ignitionText: status => ({
    color: status ? 'green' : 'red',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
  }),
  addressText: color => ({
    color: color ? backgroundColorNew : PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 10,
  }),
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
    marginRight: 5,
    // borderWidth: 1,
  },
  hiddenIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 40,
    marginLeft: 10,
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
  additionalInfoContainer: {
    // backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'column',
  },
  lastUpdate: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    paddingLeft: 25,
  },
});
