import React, {useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
  Easing,
} from 'react-native';
import IconWithName from '../../Components/IconWithName';
import TheftIcon from '../../../assets/SVG/svg/TheftIcon';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const MIN_HEIGHT = 110; // The initial height of the bottom container
const MAX_HEIGHT = SCREEN_HEIGHT / 2; // Height after expanding

const ICONS = [
  {title: 'Battery', icon: TheftIcon},
  {title: 'Network', icon: TheftIcon},
  {title: 'Ignition', icon: TheftIcon},
  {title: 'Geozone', icon: TheftIcon},
  {title: 'Breakdown', icon: TheftIcon},
];

const BottomSwipeUpContainer = ({navigation, latitude, longitude}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 0; // Respond only if there's a vertical swipe
      },
      onPanResponderMove: (evt, gestureState) => {
        const newHeight = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
        );
        animatedHeight.setValue(newHeight); // Update height directly during the drag
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          // Swipe up
          setIsExpanded(true);
          Animated.timing(animatedHeight, {
            toValue: MAX_HEIGHT,
            duration: 300,
            easing: Easing.out(Easing.ease), // Try easing for smoother effect
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 0) {
          // Swipe down
          setIsExpanded(false);
          Animated.spring(animatedHeight, {
            toValue: MIN_HEIGHT,
            friction: 5, // Adjust the spring friction for smoothness
            tension: 30, // Adjust tension as needed
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
        {ICONS.map((iconItem, index) => (
          <View key={index} style={styles.iconContainer}>
            <IconWithName
              IconComponent={iconItem.icon}
              iconSize={SCREEN_WIDTH * 0.05}
              title={iconItem.title}
              onPress={() =>
                navigation.navigate('FuelPump', {
                  headerTitle: 'Nearby Police Station',
                  theft: true,
                  latitude,
                  longitude,
                })
              }
            />
            {index < ICONS.length - 1 && <View style={styles.verticalLine} />}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingHorizontal: SCREEN_WIDTH * 0.05, // Dynamically adjust padding
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
