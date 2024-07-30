import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NetworkIcon({size, color}) {
  return (
    <Svg
      data-name="Icon material-signal-cellular-3-bar"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 17.083 17.083">
      <Path
        data-name="Path 54209"
        d="M3 20.083h17.083V3z"
        transform="translate(-3 -3)"
      />
      <Path
        data-name="Path 54210"
        d="M15.813 10.5L3 23.313h12.813z"
        transform="translate(-3 -6.229)"
        fill={color}
      />
    </Svg>
  );
}

export default NetworkIcon;
