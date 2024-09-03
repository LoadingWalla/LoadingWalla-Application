import React, {useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
  Easing,
} from 'react-native';
import BatteryIcon from '../../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../../assets/SVG/svg/NetworkIcon';
import KeyIcon from '../../../assets/SVG/svg/KeyIcon';
import GeoFencingIcon from '../../../assets/SVG/svg/GeoFencingIcon';
import AlertIcon from '../../../assets/SVG/AlertIcon';
import IconWithNameBelow from '../../Components/IconWithNameBelow';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const MIN_HEIGHT = 110;
const MAX_HEIGHT = SCREEN_HEIGHT / 2;

const getIconColor = (type, item, positions) => {
  // console.log(888888888, item);

  const position = positions[0];
  switch (type) {
    case 'Ignition':
      return position?.attributes?.ignition
        ? '#3BA700'
        : item?.position[0]?.ignition
        ? '#3BA700'
        : '#FF3500';
    case 'Battery':
      return '#696969';
    case 'Network':
      if (position?.network?.wifiAccessPoints) {
        const signalStrength =
          position.network.wifiAccessPoints[0].signalStrength;
        const networkStrength = signalStrength > -70 ? '#3BA700' : '#FFDE21';
        return `Network: ${networkStrength}`;
      } else {
        return '#FF3500';
      }
    case 'Geozone':
      return '#696969';
    case 'Breakdown':
      return '#696969';
    default:
      return '#696969';
  }
};

const getIconTitle = (type, item, positions) => {
  const position = positions[0];
  // console.log(888888888, item, position);
  switch (type) {
    case 'Battery':
      return position?.attributes?.batteryLevel
        ? `${position.attributes.batteryLevel}%`
        : 'Battery';
    case 'Network':
      if (position?.network?.wifiAccessPoints) {
        const signalStrength =
          position.network.wifiAccessPoints[0].signalStrength;
        const networkStrength = signalStrength > -70 ? 'Strong' : 'Weak';
        return `Network: ${networkStrength}`;
      } else {
        return 'Poor';
      }
    case 'Ignition':
      return 'Ignition';
    case 'Geozone':
      return 'Geozone';
    case 'Breakdown':
      return 'Breakdown';
    default:
      return '';
  }
};

const ICONS = (item, positions) => [
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
    title: getIconTitle('Breakdown', item, positions),
    icon: AlertIcon,
    color: getIconColor('Breakdown', item, positions),
  },
];

const BottomSwipeUpContainer = ({
  navigation,
  latitude,
  longitude,
  item,
  positions,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;

  console.log(item, positions);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        const newHeight = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
        );
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          // Swipe up
          setIsExpanded(true);
          Animated.timing(animatedHeight, {
            toValue: MAX_HEIGHT,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 0) {
          // Swipe down
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
  ).current;

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
            {index < ICONS(item, positions).length - 1 && (
              <View style={styles.verticalLine} />
            )}
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

export default BottomSwipeUpContainer;

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF7F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F7F7',
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
  },
  verticalLine: {
    backgroundColor: '#707070',
    width: 1,
    marginHorizontal: 5,
    height: 40,
    alignSelf: 'center',
  },
});
