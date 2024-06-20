import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NetworkIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}>
      <Path d="M1 21h20V1m-2 4.83V19h-3V8.83" fill={color} />
    </Svg>
  );
}

export default NetworkIcon;
