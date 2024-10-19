import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  I18nManager,
} from 'react-native';
import styles from './style';

const MyTabBar = ({state, navigation, position, tabs}) => {
  const layoutWidth = useRef(0);
  if (!tabs || tabs.length === 0) {
    console.error('Tabs array is empty or not defined.');
    return null; // Avoid rendering if tabs are not properly defined.
  }
  return (
    <View
      style={styles.tabsContainer}
      onLayout={e => (layoutWidth.current = e.nativeEvent.layout.width)}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () =>
          !isFocused && navigation.navigate({name: route.name, merge: true});

        const inputRange = state.routes.map((_, i) => i);
        const translateX = (isText = false) =>
          Animated.multiply(
            position.interpolate({
              inputRange,
              outputRange: inputRange.map(i => {
                const diff = i - index;
                const x = layoutWidth.current / tabs.length;
                const value = diff > 0 ? x : diff < 0 ? -x : 0;
                return !isText ? value : -value;
              }),
            }),
            I18nManager.isRTL ? -1 : 1,
          );

        return (
          <TouchableOpacity
            key={`${route.name}_${index}`}
            style={styles.touchableOpacityStyles}
            onPress={onPress}>
            <View style={[styles.iconTextContainer]}>
              <Text style={styles.routeNameStyle}>{route.name}</Text>
            </View>

            <Animated.View
              style={[
                styles.tabBgColor,
                {
                  overflow: 'hidden',
                  transform: [{translateX: translateX()}],
                },
              ]}>
              <Animated.View
                style={[
                  styles.iconTextContainer,
                  {
                    transform: [{translateX: translateX()}],
                  },
                ]}>
                <Text style={styles.routeNameBlack}>{route.name}</Text>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
