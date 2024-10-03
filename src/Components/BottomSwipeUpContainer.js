import moment from 'moment';
import React, {useRef, useState, useMemo, useCallback, useEffect} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
  Easing,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Switch from 'toggle-switch-react-native';
import IconWithNameBelow from './IconWithNameBelow';
import {GradientColor2, seperator, titleColor} from '../Color/color';
import NavigationIcon from '../../assets/SVG/svg/NavigationIcon';
import LocationHistory from '../../assets/SVG/svg/LocationHistory';
import RelayIcon from '../../assets/SVG/svg/RelayIcon';
import TheftIcon from '../../assets/SVG/svg/TheftIcon';
import FuelPumpIcon from '../../assets/SVG/svg/FuelPumpIcon';
import GeoFencingIcon from '../../assets/SVG/svg/GeoFencingIcon';
import BatteryIcon from '../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../assets/SVG/svg/NetworkIcon';
import AlertIcon from '../../assets/SVG/AlertIcon';
import KeyIcon from '../../assets/SVG/svg/KeyIcon';
import {useDispatch} from 'react-redux';
import {
  addParkingRequest,
  removeParkingRequest,
} from '../Store/Actions/Actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const MIN_HEIGHT = 110;
const MAX_HEIGHT = SCREEN_HEIGHT / 2.1;

const calculateSignalStrength = cellTowers => {
  if (cellTowers && cellTowers.length > 0) {
    const {cellId} = cellTowers[0];
    if (cellId > 20000) {
      return 80;
    } else if (cellId > 10000) {
      return 50;
    } else {
      return 20;
    }
  }
  return 0;
};

const getIconColor = (type, item, positions) => {
  const position = positions[0];
  switch (type) {
    case 'Ignition':
      return position?.attributes?.ignition
        ? '#3BA700'
        : item?.position[0]?.ignition
        ? '#3BA700'
        : '#FF3500';
    case 'Battery':
      return position?.attributes?.batteryLevel > 60 ? '3BA700' : '#FF3500';
    case 'Network':
      if (position?.network?.cellTowers) {
        const signalStrength = calculateSignalStrength(
          position.network.cellTowers,
        );
        const networkStrengthColor =
          signalStrength > 70
            ? '#3BA700'
            : signalStrength > 30
            ? '#FFDE21'
            : '#FF3500';
        return networkStrengthColor;
      } else {
        return '#FF3500';
      }

    case 'Geozone':
      return position?.geofenceIds && position.geofenceIds.length > 0
        ? '#3BA700'
        : item?.position[0]?.geofenceIds &&
          item?.position[0]?.geofenceIds.length > 0
        ? '#3BA700'
        : '#696969';
    case 'Alarm':
      return position?.attributes?.alarm ? '#FF3500' : '#696969';
    default:
      return '#696969';
  }
};

const getIconTitle = (type, item, positions) => {
  const position = positions[0];
  switch (type) {
    case 'Battery':
      return position?.attributes?.batteryLevel
        ? `${position.attributes.batteryLevel}%`
        : 'Battery';
    case 'Network':
      if (position?.network?.cellTowers) {
        const signalStrength = calculateSignalStrength(
          position.network.cellTowers,
        );
        const networkStrengthColor =
          signalStrength > 70
            ? 'Network'
            : signalStrength > 30
            ? 'Weak'
            : 'Poor';
        return networkStrengthColor;
      } else {
        return 'No Signal';
      }
    case 'Ignition':
      return position?.attributes?.ignition
        ? 'ON'
        : item?.position[0]?.ignition
        ? 'ON'
        : 'OFF';
    case 'Geozone':
      return 'Geozone';
    case 'Alarm':
      return position?.attributes?.alarm
        ? position?.attributes?.alarm
        : 'Alarm';
    default:
      return '';
  }
};

const ICONS = (item, positions) =>
  useMemo(() => {
    return [
      {
        title: getIconTitle('Battery', item, positions),
        icon: BatteryIcon,
        color: getIconColor('Battery', item, positions),
      },
      {
        title: getIconTitle('Network', item, positions),
        icon: NetworkIcon,
        color: getIconColor('Network', item, positions),
      },
      {
        title: getIconTitle('Ignition', item, positions),
        icon: KeyIcon,
        color: getIconColor('Ignition', item, positions),
      },
      {
        title: getIconTitle('Geozone', item, positions),
        icon: GeoFencingIcon,
        color: getIconColor('Geozone', item, positions),
      },
      {
        title: getIconTitle('Alarm', item, positions),
        icon: AlertIcon,
        color: getIconColor('Alarm', item, positions),
      },
    ];
  }, [item, positions]);

const BottomSwipeUpContainer = React.memo(
  ({
    navigation,
    latitude,
    longitude,
    item,
    positions,
    gpsRelayData,
    children,
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [switchOn, setSwitchOn] = useState(gpsRelayData?.parking);
    const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;
    const dispatch = useDispatch();
    // console.log(444, item);

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onMoveShouldSetPanResponder: (evt, gestureState) => {
            // Allow pan responder only when there's significant vertical movement
            return Math.abs(gestureState.dy) > 0;
          },
          onPanResponderMove: (evt, gestureState) => {
            // Disable further swipe-up when already expanded
            if (isExpanded && gestureState.dy < 0) {
              return;
            }
            const newHeight = Math.max(
              MIN_HEIGHT,
              Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
            );
            animatedHeight.setValue(newHeight);
          },
          onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy < 0 && !isExpanded) {
              // Swipe up to expand
              setIsExpanded(true);
              Animated.timing(animatedHeight, {
                toValue: MAX_HEIGHT,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
              }).start();
            } else if (gestureState.dy > 0 && isExpanded) {
              // Swipe down to collapse
              setIsExpanded(false);
              Animated.spring(animatedHeight, {
                toValue: MIN_HEIGHT,
                friction: 5,
                tension: 30,
                useNativeDriver: false,
              }).start();
            }
          },
        }),
      [isExpanded, animatedHeight],
    );

    useEffect(() => {
      setSwitchOn(gpsRelayData?.parking === 1);
    }, [gpsRelayData]);

    const toggleSwitch = useCallback(() => {
      if (switchOn) {
        dispatch(removeParkingRequest(item?.id));
      } else {
        const lati = positions[0]?.latitude || item.position[0]?.latitude;
        const long = positions[0]?.longitude || item.position[0]?.longitude;
        const circleData = `CIRCLE (${lati} ${long}, 50)`;
        dispatch(addParkingRequest('parking_added', circleData, item?.id));
      }
      setSwitchOn(prevState => !prevState);
    }, [dispatch, item?.id, switchOn]);

    const onNavigatePress = () => {
      const destination = positions[positions.length - 1] || item?.position[0];
      if (destination) {
        const url = `google.navigation:q=${destination.latitude},${destination.longitude}`;
        Linking.openURL(url).catch(err =>
          console.error('Error opening Google Maps', err),
        );
      }
    };

    const onHistoryPress = () => {
      navigation.navigate('LocationHistory', {
        deviceId: item?.id,
        name: item?.name,
        from: moment().utcOffset(330).startOf('day').toISOString(),
        to: moment().utcOffset(330).endOf('day').toISOString(),
      });
    };

    const onGeozonePress = () => {
      navigation.navigate('AddGeozone', {
        deviceId: item?.id,
        lat: positions[0]?.latitude || item.position[0]?.latitude,
        lon: positions[0]?.longitude || item.position[0]?.longitude,
        name: item?.name,
        address: item?.address,
      });
    };

    const onTheftPress = () => {
      navigation.navigate('FuelPump', {
        headerTitle: 'Nearby Police Station',
        theft: true,
        latitude: positions[0]?.latitude || item?.position[0]?.latitude,
        longitude: positions[0]?.longitude || item?.position[0]?.longitude,
      });
    };

    const onRelayPress = () => {
      navigation.navigate('GpsRelay', {
        deviceId: item?.id,
        item: item,
        gpsRelayData,
      });
    };

    const onFuelPumpPress = () => {
      navigation.navigate('FuelPump', {
        headerTitle: 'Fuel Pump',
        theft: false,
        latitude: positions[0]?.latitude || item?.position[0]?.latitude,
        longitude: positions[0]?.longitude || item?.position[0]?.longitude,
      });
    };

    return (
      <Animated.View
        style={[styles.bottomContainer, {height: animatedHeight}]}
        {...panResponder.panHandlers}>
        <View style={styles.swipeIndicator} />
        <View style={styles.iconRow}>
          {ICONS(item, positions).map((iconItem, index) => (
            <View key={index} style={styles.iconContainer}>
              <IconWithNameBelow
                IconComponent={iconItem.icon}
                iconSize={SCREEN_WIDTH * 0.05}
                title={iconItem.title}
                color={iconItem.color}
              />
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          {renderButtonSections({
            onNavigatePress,
            onHistoryPress,
            onGeozonePress,
            onTheftPress,
            onRelayPress,
            onFuelPumpPress,
            gpsRelayData,
          })}
        </View>

        <View style={styles.parkingAlarm}>
          <Text style={styles.parkingText}>Parking Alarm</Text>
          <Switch
            isOn={!!switchOn}
            onColor={GradientColor2}
            offColor={seperator}
            size="small"
            onToggle={toggleSwitch}
          />
        </View>
        {/* {children && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent',
              zIndex: 10,
              height: SCREEN_HEIGHT / 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {children}
          </View>
        )} */}
      </Animated.View>
    );
  },
);

export default BottomSwipeUpContainer;

const renderButtonSections = ({
  onNavigatePress,
  onHistoryPress,
  onGeozonePress,
  onTheftPress,
  onRelayPress,
  onFuelPumpPress,
  gpsRelayData,
}) => (
  <>
    <View style={styles.buttonRow}>
      <ButtonComponent
        icon={NavigationIcon}
        label="Navigate"
        onPress={onNavigatePress}
      />
      <ButtonComponent
        icon={LocationHistory}
        label="History"
        onPress={onHistoryPress}
        size={20}
      />
      <ButtonComponent
        icon={RelayIcon}
        label="Relay"
        dynamicTitleColor={gpsRelayData?.relay ? '#3BA700' : 'red'}
        dynamicTitle={gpsRelayData?.relay ? '(ON)' : '(OFF)'}
        onPress={onRelayPress}
        size={20}
        color={gpsRelayData?.relay ? '#3BA700' : '#ff7753'}
        bgcolor={gpsRelayData?.relay}
      />
    </View>
    <View style={styles.buttonRow}>
      <ButtonComponent
        icon={TheftIcon}
        label="Theft"
        onPress={onTheftPress}
        size={20}
      />
      <ButtonComponent
        icon={FuelPumpIcon}
        label="Fuel Pump"
        onPress={onFuelPumpPress}
        size={20}
      />
      <ButtonComponent
        icon={GeoFencingIcon}
        label="Geozone"
        onPress={onGeozonePress}
      />
    </View>
  </>
);

const ButtonComponent = ({
  icon: Icon,
  label,
  onPress,
  dynamicTitleColor,
  dynamicTitle,
  color = '#ff7753',
  size = 25,
  bgcolor = false,
}) => (
  <TouchableOpacity style={styles.button(bgcolor)} onPress={onPress}>
    <Icon size={size} color={color} />
    <Text style={styles.buttonText}>
      {label}
      <Text style={{color: dynamicTitleColor}}>{dynamicTitle}</Text>
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF7F5',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    zIndex: 1,
  },
  swipeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#CCCCCC',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: '#00000029',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLine: {
    backgroundColor: '#707070',
    width: 1,
    marginHorizontal: 5,
    height: 40,
    alignSelf: 'center',
  },
  infoSection: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: '#00000029',
    backgroundColor: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  button: color => ({
    backgroundColor: color ? '#F7FFF2' : '#FFF7F5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 5,
    minWidth: '30%',
    maxWidth: '32%',
  }),
  buttonText: {
    marginLeft: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    color: titleColor,
  },
  parkingAlarm: {
    borderWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: '#00000029',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parkingText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: '#696969',
  },
});
