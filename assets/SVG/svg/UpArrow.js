import React from 'react';
import {Path, Svg} from 'react-native-svg';

const UpArrow = ({size, color, style}) => {
  return (
    <Svg
      width={size}
      height={size}
      style={style}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M11 7L6 2L1 7" stroke={color} stroke-width="2" />
    </Svg>
  );
};

export default UpArrow;
