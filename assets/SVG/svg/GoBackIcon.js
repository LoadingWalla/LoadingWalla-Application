import React from 'react';
import {Svg, Path} from 'react-native-svg';

const GoBackIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24">
      <Path
        d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
        fill={color}
      />
    </Svg>
  );
};

export default GoBackIcon;
