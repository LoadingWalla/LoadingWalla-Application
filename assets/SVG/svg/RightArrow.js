import React from 'react';
import {Path, Svg} from 'react-native-svg';

const RightArrow = ({size, color, style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={style}
      viewBox="0 0 24 24">
      <Path
        d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
        fill={color}
      />
    </Svg>
  );
};

export default RightArrow;
