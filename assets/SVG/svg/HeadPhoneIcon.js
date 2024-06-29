import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeadPhoneIcon({size, color, style}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      style={style}
      width={size}>
      <Path
        d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7 7 7 0 017 7v2h-4v8h3a3 3 0 003-3v-7c0-5-4.03-9-9-9z"
        fill={color}
      />
    </Svg>
  );
}

export default HeadPhoneIcon;
