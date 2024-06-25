import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DownloadIcon({props, size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      {...props}>
      <Path
        d="M2 12h2v5h16v-5h2v5c0 1.11-.89 2-2 2H4a2 2 0 01-2-2v-5m10 3l5.55-5.46-1.42-1.41L13 11.25V2h-2v9.25L7.88 8.13 6.46 9.55 12 15z"
        fill={color}
      />
    </Svg>
  );
}

export default DownloadIcon;
