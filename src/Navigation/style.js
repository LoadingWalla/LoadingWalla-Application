import {StyleSheet} from 'react-native';
import {GradientColor2} from '../Color/color';
export default StyleSheet.create({
  bottomImage: {
    height: 20,
    width: 20,
  },

  animatedViewStyle: (width, offsetValue) => ({
    width: width(),
    height: 3,
    backgroundColor: GradientColor2,
    position: 'absolute',
    bottom: 55,
    borderRadius: 20,
    transform: [{translateX: offsetValue}],
  }),

  animatedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: -1, // Ensure it stays behind the tab bar items
  },
  animatedBackground: {
    height: 60,
    width: 0,
    backgroundColor: 'pink', // Initial color
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
