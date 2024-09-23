import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NetworkIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24">
      {/* Static Background */}
      <Path d="M0 0h24v24H0z" fill="none" />

      {/* 3-bar (strong signal) */}
      <Path d="M0 24h24V0z" fill={color} />

      {/* 2-bar (medium signal) */}
      <Path d="M14 10L2 22h12z" fill={color} />

      {/* 1-bar (weak signal) */}
      <Path d="M6 18l-4 4h4z" fill={color} />
    </Svg>
  );
}

export default NetworkIcon;
