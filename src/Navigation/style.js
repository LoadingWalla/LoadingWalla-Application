import {StyleSheet} from 'react-native';
import {GradientColor2} from '../Color/color';
export default StyleSheet.create({
  bottomImage: {
    height: 20,
    width: 20,
  },

  animatedViewStyle: (width, offsetValue) => ({
    width: width(),
    height: 2,
    backgroundColor: GradientColor2,
    position: 'absolute',
    bottom: 55,
    borderRadius: 20,
    transform: [{translateX: offsetValue}],
  }),

  flex: {flex: 1},
});
