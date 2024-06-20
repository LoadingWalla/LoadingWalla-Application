import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NavigationIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}>
      <Path d="M21 3L3 10.53v.97l6.84 2.66L12.5 21h.96L21 3z" fill={color} />
    </Svg>
  );
}

export default NavigationIcon;
