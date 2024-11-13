import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  backgroundColorNew,
  // GradientColor1,
  // GradientColor2,
  // GradientColor3,
} from '../Color/color';

const Background = ({style, children, bgcolors }) => {
  return (
    <LinearGradient
      // colors={[GradientColor1, GradientColor2, GradientColor3]}
      // colors={[backgroundColorNew, backgroundColorNew]}
      colors={bgcolors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style}>
      {children}
    </LinearGradient>
  );
};
export default Background;
