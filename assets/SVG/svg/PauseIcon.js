import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PauseIcon({size, color, props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      {...props}>
      <Path d="M14 19h4V5h-4M6 19h4V5H6v14z" fill={color} />
    </Svg>
  );
}

export default PauseIcon;
