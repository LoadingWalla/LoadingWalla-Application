import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NextIcon({size, color, props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      {...props}>
      <Path d="M16 18h2V6h-2M6 18l8.5-6L6 6v12z" fill={color} />
    </Svg>
  );
}

export default NextIcon;
