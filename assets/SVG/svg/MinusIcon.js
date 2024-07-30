import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MinusIcon({props, color, size}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      {...props}>
      <Path d="M19 13H5v-2h14v2z" fill={color} />
    </Svg>
  );
}

export default MinusIcon;
