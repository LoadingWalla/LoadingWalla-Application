import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AlertIcon({props, size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      height={size}
      width={size}>
      <Path
        d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"
        fill={color}
      />
    </Svg>
  );
}

export default AlertIcon;
