import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  View,
  Text,
  Linking,
  Easing,
  Dimensions,
} from 'react-native';
import Switch from 'toggle-switch-react-native';
import { useDispatch } from 'react-redux';
import { addParkingRequest, removeParkingRequest } from '../Store/Actions/Actions';
import * as Constants from '../Constants/Constant';
import ButtonComponent from './ButtonComponent';
import IconWithNameBelow from './IconWithNameBelow';
import { useTranslation } from 'react-i18next';
import styles from './style';
import { btnGreen, seperator } from '../Color/color';

const MIN_HEIGHT = 101;

const BottomSwipeUpContainer = ({
  navigation,
  item,
  positions,
  gpsRelayData,
}) => {
  const [swipeIndicatorHeight, setSwipeIndicatorHeight] = useState(0);
  const [iconRowHeight, setIconRowHeight] = useState(0);
  const [infoSectionHeight, setInfoSectionHeight] = useState(0);
  const [parkingAlarmHeight, setParkingAlarmHeight] = useState(0);

  const [isExpanded, setIsExpanded] = useState(false);
  const [switchOn, setSwitchOn] = useState(gpsRelayData?.parking);
  const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const MAX_HEIGHT = swipeIndicatorHeight + iconRowHeight + infoSectionHeight + parkingAlarmHeight;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 0,
        onPanResponderMove: (evt, gestureState) => {
          if (isExpanded && gestureState.dy < 0) return;
          const newHeight = Math.max(
            MIN_HEIGHT,
            Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
          );
          animatedHeight.setValue(newHeight);
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy < 0 && !isExpanded) {
            // Expand
            setIsExpanded(true);
            Animated.timing(animatedHeight, {
              toValue: MAX_HEIGHT,
              duration: 300,
              easing: Easing.out(Easing.ease),
              useNativeDriver: false,
            }).start();
          } else if (gestureState.dy > 0 && isExpanded) {
            // Collapse
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
    [isExpanded, MAX_HEIGHT],
  );

  useEffect(() => {
    setSwitchOn(gpsRelayData?.parking === 1);
  }, [gpsRelayData]);

  return (
    <Animated.View
      style={[styles.bottomContainer, { height: animatedHeight }]}
      {...panResponder.panHandlers}
    >
      {/* 1 - Swipe Indicator */}
      <View
        onLayout={(event) => setSwipeIndicatorHeight(event.nativeEvent.layout.height)}
        style={styles.swipeIndicator}
      />

      {/* 2 - Icon Row */}
      <View
        onLayout={(event) => setIconRowHeight(event.nativeEvent.layout.height)}
        style={styles.iconRow}
      >
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

      {/* 3 - Info Section */}
      <View
        onLayout={(event) => setInfoSectionHeight(event.nativeEvent.layout.height)}
        style={styles.infoSection}
      >
        {/* Button rows go here */}
      </View>

      {/* 4 - Parking Alarm */}
      <View
        onLayout={(event) => setParkingAlarmHeight(event.nativeEvent.layout.height)}
        style={styles.parkingAlarm}
      >
        <Text style={styles.parkingText}>{t(Constants.PARKING_ALARM)}</Text>
        <View>
          <Switch
            isOn={!!switchOn}
            onColor={'white'}
            circleColor={switchOn ? btnGreen : 'white'}
            offColor={seperator}
            size="small"
            onToggle={() => setSwitchOn(!switchOn)}
            style={{
              borderWidth: 1,
              borderColor: switchOn ? btnGreen : 'white',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default BottomSwipeUpContainer;
