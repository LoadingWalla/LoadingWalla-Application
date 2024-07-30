import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
export const routes = {
  home: {name: 'Home', icon: 'home'},
  feed: {name: 'Feed', icon: 'bars'},
  profile: {name: 'Profile', icon: 'user'},
  settings: {name: 'Settings', icon: 'setting'},
};

const {width} = Dimensions.get('window');

// 20 on each side for absolute positioning of the tab bar
// 20 on each side for the internal padding
const TAB_WIDTH = width / 3;

const TabBarComponent = ({state, navigation, descriptors}) => {
  const translateX = useSharedValue(0);
  const focusedTab = state.index;

  const handleAnimate = index => {
    'worklet';
    translateX.value = withTiming(index * TAB_WIDTH, {
      duration: 400,
    });
  };
  useEffect(() => {
    runOnUI(handleAnimate)(focusedTab);
  }, [focusedTab]);

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  return (
    <>
      <Animated.View style={[styles.container, rnStyle]} />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
              params: {},
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const routeName = route.name.toLowerCase();
        const icon = routes[routeName]?.icon;
        return (
          <Pressable
            key={`route-${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}>
            {/* <AntDesign
              name={icon}
              size={24}
              color={isFocused ? '#A9A9A9' : 'black'}
            /> */}
            <Text style={{color: isFocused ? '#A9A9A9' : 'black'}}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </>
  );
};

export default TabBarComponent;

const styles = StyleSheet.create({
  container: {
    width: TAB_WIDTH,
    height: 40,
    backgroundColor: 'white',
    zIndex: 0,
    position: 'absolute',
    // marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
