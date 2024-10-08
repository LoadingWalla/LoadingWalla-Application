import React, {useState, memo, useMemo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PrivacyPolicy, backgroundColorNew, titleColor} from '../Color/color';
import {useTranslation} from 'react-i18next';
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
import * as Constants from '../Constants/Constant';

const GpsItem = ({navigation, item}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const {t} = useTranslation();
  // console.log(444444, 'GpsItem---->', item);
  const {
    position = [],
    status,
    name,
    disabled,
    id,
    lastUpdate,
    address,
    distance,
    relay,
    category = 'default',
  } = item;

  const attributes = useMemo(() => position[0]?.attributes || {}, [position]);
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

  const isNavigationDisabled = useMemo(() => disabled, [disabled]);

  const showAlert = useCallback(message => AlertBox(message), []);

  const handlePress = useCallback(
    index => setActiveIndex(activeIndex === index ? null : index),
    [activeIndex],
  );

  const handleNavigation = useCallback(() => {
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
  }, [
    isNavigationDisabled,
    disabled,
    id,
    name,
    position,
    navigation,
    showAlert,
  ]);

  const renderStatus = useMemo(() => {
    if (status === 'online') {
      return <Text style={styles.ignitionText(true)}>GPS {t(Constants.ACTIVE)}</Text>;
    }
    if (status === 'offline') {
      return (
        <Text style={styles.ignitionText(false)}>
          {moment(lastUpdate).fromNow()}
        </Text>
      );
    }
    return (
      <Text style={styles.lastUpdateText}>{moment(lastUpdate).fromNow()}</Text>
    );
  }, [status, lastUpdate]);

  const ignitionStatus = useMemo(
    () => (ignition || motion ? 'on' : 'off'),
    [ignition, motion],
  );
  const speedText = useMemo(
    () => Math.floor((position[0]?.speed || 0) * 1.852),
    [position],
  );
  const iconColor = status === 'offline' ? 'red' : 'green';

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.container} onPress={handleNavigation}>
        <View style={styles.itemContainer}>
          <View style={styles.imgContainer}>
            <View style={styles.imgBox}>
              <VehicleIcon category={category} size={50} color="#000" />
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textViewContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.highlightText}>{name}</Text>
                <Text style={[styles.ignitionText(motion), styles.motionText]}>
                  {motion ? '(Running)' : '(Stopped)'}
                </Text>
              </View>

              <View style={styles.ignBox}>
                {renderStatus}
                <View style={styles.verticalLine} />
                <View style={styles.row}>
                  <Text style={styles.distanceText}>Ignition</Text>
                  <Text
                    style={[
                      styles.ignitionText(ignition || motion),
                      styles.ignitionStatus,
                    ]}>
                    {ignitionStatus.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.iconBox}>
              <View style={styles.iconRow}>
                <BatteryIcon
                  size={15}
                  color={batteryLevel > 60 ? iconColor : 'red'}
                  charge={charge}
                  batteryLevel={batteryLevel}
                />
                {network !== null && (
                  <NetworkIcon color={iconColor} size={14} />
                )}
              </View>
              <View style={styles.hiddenIconRow}>
                {relay && <RelayIcon size={14} color={'green'} />}
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
          <View style={styles.distanceBox}>
            <Text style={styles.speedText(motion)}>{speedText}</Text>
            <Text style={styles.distanceText}>KM/H</Text>
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {moment(lastUpdate).format('MMM DD, YYYY hh:mm A')}
        </Text>
        <View style={styles.verticalLine} />
        <View style={styles.footerDistanceContainer}>
          <Text style={styles.footerText}>{t(Constants.TODAY_DISTANCE)}:</Text>
          <Text style={styles.footerDistanceText}>
            {(distance / 1000).toFixed(2)} KM
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(GpsItem);

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    backgroundColor: '#FFE5DE',
    borderRadius: 8,
  },
  container: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
  },
  textViewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  highlightText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
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
  },
  ignitionText: status => ({
    color: status ? 'green' : 'red',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    // textTransform: 'uppercase',
  }),
  motionText: {
    textAlign: 'left',
    marginLeft: 10,
  },
  ignitionStatus: {
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  addressText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 10,
  },
  lastUpdateText: {
    color: 'red',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 40,
    marginRight: 5,
  },
  hiddenIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 40,
    marginLeft: 10,
  },
  addressContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5,
    // borderWidth: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  footerText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
  },
  footerDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerDistanceText: {
    textAlign: 'left',
    marginLeft: 5,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
});
