import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CheckOutline({size, color, style}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={style}
      height={size}
      width={size}>
      <Path
        d="M21 5L9 17l-5.5-5.5 1.41-1.41L9 14.17 19.59 3.59 21 5M3 21v-2h18v2H3z"
        fill={color}
      />
    </Svg>
  );
}

export default CheckOutline;
