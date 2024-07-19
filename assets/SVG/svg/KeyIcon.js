import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function KeyIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      style={{transform: [{rotate: '90deg'}]}}>
      <Path
        d="M22 18v4h-4v-3h-3v-3h-3l-2.26-2.26c-.55.17-1.13.26-1.74.26a6 6 0 01-6-6 6 6 0 016-6 6 6 0 016 6c0 .61-.09 1.19-.26 1.74L22 18M7 5a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2z"
        fill={color}
      />
    </Svg>
  );
}

export default KeyIcon;
