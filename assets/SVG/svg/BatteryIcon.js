import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BatteryIcon({size, color, charge, batteryLevel}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}>
      {charge ? (
        <Path
          d="M16.67 4H15V2H9v2H7.33A1.33 1.33 0 006 5.33v15.33C6 21.4 6.6 22 7.33 22h9.33c.74 0 1.34-.6 1.34-1.33V5.33C18 4.6 17.4 4 16.67 4M11 20v-5.5H9L13 7v5.5h2"
          fill={'green'}
        />
      ) : (
        <Path
          d={`M16 ${
            batteryLevel < 60 ? '14H8V6h8m' : '8H8V6h8m'
          }.67-2H15V2H9v2H7.33A1.33 1.33 0 006 5.33v15.34C6 21.4 6.6 22 7.33 22h9.34A1.33 1.33 0 0018 20.67V5.33C18 4.6 17.4 4 16.67 4z`}
          fill={color}
        />
      )}
    </Svg>
  );
}

export default BatteryIcon;
