import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  I18nManager,
  StyleSheet,
} from 'react-native';

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
            style={{flex: 1, overflow: 'hidden'}}
            onPress={onPress}>
            <View style={[styles.iconTextContainer]}>
              <Text style={{color: 'grey'}}>{route.name}</Text>
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
                  {transform: [{translateX: translateX()}]},
                ]}>
                <Text style={{color: 'black'}}>{route.name}</Text>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  // MyTabBar
  tabsContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#E2E2E2',
    borderRadius: 8,
    padding: 3,
    // borderWidth: 1,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 8,
    // borderWidth: 1,
  },
  tabBgColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    borderRadius: 5,
    // borderWidth: 1,
  },
});
