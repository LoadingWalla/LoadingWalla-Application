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
import {btnGreen, GradientColor2, seperator, titleColor} from '../Color/color';
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
2;
import {useDispatch} from 'react-redux';
import {
  addParkingRequest,
  removeParkingRequest,
} from '../Store/Actions/Actions';
import * as Constants from '../Constants/Constant';
import {useTranslation} from 'react-i18next';
import styles from './style';
import ButtonComponent from './ButtonComponent';
import Geozone from '../../assets/SVG/svg/Geozone';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const MIN_HEIGHT = 101;
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

const getIconTitle = (type, item, positions, t) => {
  // const {t} = useTranslation();
  const position = positions[0];
  switch (type) {
    case 'Battery':
      return position?.attributes?.batteryLevel
        ? `${position.attributes.batteryLevel}%`
        : t(Constants.BATTERY);
    case 'Network':
      if (position?.network?.cellTowers) {
        const signalStrength = calculateSignalStrength(
          position.network.cellTowers,
        );
        const networkStrengthColor =
          signalStrength > 70
            ? t(Constants.NETWORK)
            : signalStrength > 30
            ? t(Constants.WEAK)
            : t(Constants.POOR);
        return networkStrengthColor;
      } else {
        return t(Constants.NO_SIGNAL);
      }
    case 'Ignition':
      return position?.attributes?.ignition
        ? t(Constants.ON)
        : item?.position[0]?.ignition
        ? t(Constants.ON)
        : t(Constants.OFF);
    case 'Geozone':
      return t(Constants.GEOZONE);
    case 'Alarm':
      return position?.attributes?.alarm
        ? position?.attributes?.alarm
        : t(Constants.ALARM);
    default:
      return '';
  }
};

const ICONS = (item, positions, t) =>
  useMemo(() => {
    return [
      {
        title: getIconTitle('Battery', item, positions, t),
        icon: BatteryIcon,
        color: getIconColor('Battery', item, positions),
      },
      {
        title: getIconTitle('Network', item, positions, t),
        icon: NetworkIcon,
        color: getIconColor('Network', item, positions),
      },
      {
        title: getIconTitle('Ignition', item, positions, t),
        icon: KeyIcon,
        color: getIconColor('Ignition', item, positions),
      },
      {
        title: getIconTitle('Geozone', item, positions, t),
        icon: GeoFencingIcon,
        color: getIconColor('Geozone', item, positions),
      },
      {
        title: getIconTitle('Alarm', item, positions, t),
        icon: AlertIcon,
        color: getIconColor('Alarm', item, positions),
      },
    ];
  }, [item, positions]);

//item - gpsDeviceData
//positions - wsMessages22
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
    const [swipeIndicatorHeight, setSwipeIndicatorHeight] = useState(0);
    const [iconRowHeight, setIconRowHeight] = useState(0);
    const [infoSectionHeight, setInfoSectionHeight] = useState(0);
    const [parkingAlarmHeight, setParkingAlarmHeight] = useState(0);
    const [bottomSpace, setBottomSpace] = useState(0);

    const [total, setTotal] = useState(SCREEN_HEIGHT / 2.1);
    const [limit, setLimit] = useState(MAX_HEIGHT);

    const [isExpanded, setIsExpanded] = useState(false);
    const [switchOn, setSwitchOn] = useState(gpsRelayData?.parking);
    const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;
    const dispatch = useDispatch();
    const {t} = useTranslation();
    // console.log(444, item);
    console.log('------------BottomSwipeUpItem--------------', item);
    console.log('---------BottomSwipeUpWsMessage22----------', positions[0]);

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
              Math.min(limit, MIN_HEIGHT - gestureState.dy),
            );
            animatedHeight.setValue(newHeight);
          },
          onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy < 0 && !isExpanded) {
              // Swipe up to expand
              setIsExpanded(true);
              Animated.timing(animatedHeight, {
                // toValue: MAX_HEIGHT,
                toValue: total,
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
      [isExpanded, animatedHeight, total],
    );

    useEffect(() => {
      const calculatedMaxHeight =
        swipeIndicatorHeight +
        iconRowHeight +
        infoSectionHeight +
        parkingAlarmHeight +
        bottomSpace;
      setTotal(calculatedMaxHeight);
      setLimit(calculatedMaxHeight);
    }, [
      swipeIndicatorHeight,
      iconRowHeight,
      infoSectionHeight,
      parkingAlarmHeight,
      bottomSpace,
    ]);

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
        headerTitle: t(Constants.POLICE_STAT),
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
        headerTitle: t(Constants.FUEL_PUMP),
        theft: false,
        latitude: positions[0]?.latitude || item?.position[0]?.latitude,
        longitude: positions[0]?.longitude || item?.position[0]?.longitude,
      });
    };

    return (
      <Animated.View
        style={[styles.bottomContainer, {height: animatedHeight}]}
        {...panResponder.panHandlers}>
        {/* 1 */}
        <View
          onLayout={event => {
            console.log('-------- 0-------->', event.nativeEvent.layout.height);
            setSwipeIndicatorHeight(event.nativeEvent.layout.height);
          }}
          style={styles.swipeIndicator}
        />

        {/* 2 */}
        <View
          onLayout={event => {
            console.log('-------- 1-------->', event.nativeEvent.layout.height);
            setIconRowHeight(event.nativeEvent.layout.height);
          }}
          style={styles.iconRow}>
          {ICONS(item, positions, t).map((iconItem, index) => (
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

        {/* 3 */}
        <View
          onLayout={event => {
            console.log('-------- 2-------->', event.nativeEvent.layout.height);
            setInfoSectionHeight(event.nativeEvent.layout.height);
          }}
          style={styles.infoSection}>
          <View style={styles.buttonRow}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <ButtonComponent
                icon={NavigationIcon}
                label={t(Constants.NAVIGATE)}
                onPress={onNavigatePress}
                size={25}
              />
              <ButtonComponent
                icon={LocationHistory}
                label={t(Constants.HISTORY)}
                onPress={onHistoryPress}
                size={25}
              />
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <ButtonComponent
                icon={Geozone}
                label={t(Constants.GEOZONE)}
                onPress={onGeozonePress}
                size={25}
              />
              <ButtonComponent
                icon={TheftIcon}
                label={t(Constants.THEFT)}
                onPress={onTheftPress}
                size={25}
              />
            </View>
          </View>
          <View style={styles.buttonRow}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <ButtonComponent
                icon={FuelPumpIcon}
                label={t(Constants.FUEL_PUMP)}
                onPress={onFuelPumpPress}
                size={25}
              />
              <ButtonComponent
                icon={RelayIcon}
                label={t(Constants.RELAY)}
                dynamicTitleColor={gpsRelayData?.relay ? '#3BA700' : 'red'}
                dynamicTitle={gpsRelayData?.relay ? '(ON)' : '(OFF)'}
                onPress={onRelayPress}
                size={25}
                color={gpsRelayData?.relay ? '#3BA700' : '#ff7753'}
                bgcolor={gpsRelayData?.relay}
              />
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              {/* to add additional features */}
            </View>
          </View>
        </View>

        {/* 4 */}
        <View
          onLayout={event => {
            console.log('-------- 3-------->', event.nativeEvent.layout.height);
            setParkingAlarmHeight(event.nativeEvent.layout.height);
          }}
          style={styles.parkingAlarm}>
          <Text style={styles.parkingText}>{t(Constants.PARKING_ALARM)}</Text>
          <View>
            <Switch
              isOn={!!switchOn}
              onColor={'white'}
              circleColor={switchOn ? btnGreen : 'white'}
              offColor={seperator}
              size="small"
              onToggle={toggleSwitch}
              style={{
                borderWidth: 1,
                borderColor: switchOn ? btnGreen : 'white',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            />
          </View>
        </View>

        <View
          onLayout={event => {
            console.log('-------- 5-------->', event.nativeEvent.layout.height);
            setBottomSpace(event.nativeEvent.layout.height);
          }}
          style={{
            minHeight: 15,
            width: '100%',
            paddingVertical: 15,
          }}>
          <Text />
        </View>
      </Animated.View>
    );
  },
);

export default BottomSwipeUpContainer;
