import React from 'react';
import {Path, Svg} from 'react-native-svg';

const DownArrow = ({size, color, style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 12 8"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M11 1L6 6L1 1" stroke={color} stroke-width="2" />
    </Svg>
  );
};

export default DownArrow;
