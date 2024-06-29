import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PlayIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}>
      <Path d="M8 5.14v14l11-7-11-7z" fill={color} />
    </Svg>
  );
}

export default PlayIcon;
