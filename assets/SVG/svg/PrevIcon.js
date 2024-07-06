import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PrevIcon({size, color, props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      {...props}>
      <Path d="M6 18V6h2v12H6m3.5-6L18 6v12l-8.5-6z" fill={color} />
    </Svg>
  );
}

export default PrevIcon;
