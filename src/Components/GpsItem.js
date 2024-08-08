import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {PrivacyPolicy, backgroundColorNew, titleColor} from '../Color/color';
import SettingIcon from '../../assets/SVG/svg/SettingIcon';
import FuelIcon from '../../assets/SVG/svg/FuelIcon';
import BatteryIcon from '../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../assets/SVG/svg/NetworkIcon';
import GeoFencingIcon from '../../assets/SVG/svg/GeoFencingIcon';
import AlertBox from './AlertBox';
import KeyIcon from '../../assets/SVG/svg/KeyIcon';
import AlertIcon from '../../assets/SVG/AlertIcon';
import ToggleIconText from './ToggleIconText';
import moment from 'moment';

const GpsItem = ({navigation, item, icon, isDisable}) => {
  // console.log(66666, item);
  const [activeIndex, setActiveIndex] = useState(null);

  const attributes =
    item?.position?.length > 0 ? item.position[0].attributes : {};
  const ignition = attributes?.ignition || attributes?.motion;
  const totalDistance = attributes?.totalDistance
    ? (attributes.totalDistance / 1000).toFixed(3)
    : '0.00';
  const distance = attributes?.distance
    ? (attributes.distance / 1000).toFixed(3)
    : '0.00';
  const batteryLevel = attributes?.batteryLevel;
  const isNavigationDisabled = item?.disabled || item?.positionId === 0;

  const showAlert = message => {
    AlertBox(message);
  };

  const handlePress = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const renderStatus = () => {
    if (item?.status === 'online') {
      return <Text style={{color: 'green'}}>Active</Text>;
    } else if (item?.status === 'offline') {
      return <Text style={{color: backgroundColorNew}}>Inactive</Text>;
    } else {
      return (
        <Text style={styles.lastUpdateText}>
          {moment(item?.lastUpdate).fromNow()}
        </Text>
      );
    }
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
          </View>
        </View>
        <TouchableOpacity
          disabled={isDisable}
          onPress={() => {
            if (Array.isArray(item?.position) && item?.position.length === 0) {
              if (item?.disabled) {
                showAlert('Service unavailable! Your Plan has been Expired.');
              } else {
                showAlert('Wait! GPS Network Error.');
              }
            } else if (isNavigationDisabled) {
              showAlert('Service unavailable! Your Plan has been Expired.');
            } else {
              navigation.navigate('trackingtruck', {
                deviceId: item?.id,
                lat: item?.position[0]?.latitude,
                long: item?.position[0]?.longitude,
              });
            }
          }}
          style={styles.textContainer}>
          <Text style={styles.highlightText}>{item?.name}</Text>
          <View>
            <View style={styles.ignBox}>{renderStatus()}</View>
            {/* <View style={styles.ignBox}>{renderStatus()}</View> */}
          </View>
          <View style={styles.iconBox}>
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                minWidth: 80,
              }}>
              <BatteryIcon
                size={20}
                color={
                  batteryLevel
                    ? batteryLevel > 60
                      ? 'green'
                      : 'red'
                    : '#727272'
                }
                charge={attributes.charge}
                batteryLevel={batteryLevel}
              />
              {attributes.network !== null && (
                <NetworkIcon color={'green'} size={18} />
              )}
              <KeyIcon
                size={19}
                color={ignition ? 'green' : backgroundColorNew}
              />
            </View>
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                minWidth: 80,
              }}>
              {attributes.alarm && (
                <ToggleIconText
                  IconComponent={AlertIcon}
                  text={attributes.alarm}
                  iconSize={20}
                  color={backgroundColorNew}
                  index={2}
                  activeIndex={activeIndex}
                  activeText={false}
                  onPress={() => handlePress(2)}
                />
              )}
              {attributes.fuel && <FuelIcon size={20} color={'#727272'} />}
              {attributes.geofence && <GeoFencingIcon size={20} />}
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.distanceBox}>
            <Text style={styles.highlightText}>{`${distance} KM`}</Text>
            <Text style={styles.distanceText}>Today Distance</Text>
          </View>
        </View>
      </View>
      <View style={styles.expiryDate}>
        <Text style={item?.disabled ? styles.expiredText : styles.activeText}>
          Expire on Feb 20, 2025
        </Text>
        <TouchableOpacity
          disabled={isDisable}
          onPress={() => {
            if (Array.isArray(item?.position) && item?.position.length === 0) {
              if (item?.disabled) {
                showAlert('Service unavailable! Your Plan has been Expired.');
              } else {
                showAlert('Wait! GPS Network Error.');
              }
            } else if (isNavigationDisabled) {
              showAlert('Service unavailable! Your Plan has been Expired.');
            } else {
              navigation.navigate('GpsSetting', {deviceId: item?.id});
            }
          }}>
          <SettingIcon
            size={20}
            color={item?.disabled ? backgroundColorNew : PrivacyPolicy}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GpsItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
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
    padding: 10,
  },
  modelText: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  expiredText: {
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
  activeText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
  expiryDate: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    textAlign: 'left',
    textTransform: 'uppercase',
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
    fontSize: 12,
    textAlign: 'right',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    // borderWidth: 1,
    minWidth: 180,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 10,
    height: '80%',
  },
  ignBox: {flexDirection: 'row', alignItems: 'center'},
  imgContainer: {
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imgBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    width: 60,
    height: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignitionStatus: {flexDirection: 'row', borderWidth: 0},
  ignitionText: {fontFamily: 'PlusJakartaSans-SemiBold'},
});
