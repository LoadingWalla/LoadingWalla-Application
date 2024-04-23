import React from 'react';
import {Path, Svg} from 'react-native-svg';

const DownArrow = ({size, color, style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      width={size}
      height={size}
      style={style}
      viewBox="0 0 512 512">
      <Path
        fill={color}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="48"
        d="M112 184l144 144 144-144"
      />
    </Svg>
  );
};

export default DownArrow;
