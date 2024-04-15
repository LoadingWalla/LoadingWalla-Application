import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {GradientColor1, GradientColor2, GradientColor3} from '../Color/color';

const Background = ({style, children}) => {
  return (
    <LinearGradient
      colors={[GradientColor1, GradientColor2, GradientColor3]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style}>
      {children}
    </LinearGradient>
  );
};
export default Background;
