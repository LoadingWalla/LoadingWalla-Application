import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function BatteryIcon({size, color, charge, batteryLevel}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 9.741 17.982">
      <G data-name="Icon ion-battery-full">
        <Path
          data-name="Path 54206"
          d="M1.681 0h11.354a1.681 1.681 0 011.681 1.681V6.56a1.681 1.681 0 01-1.681 1.681H1.681A1.681 1.681 0 010 6.56V1.681A1.681 1.681 0 011.681 0z"
          fill="none"
          stroke="#000"
          strokeLinecap="square"
          strokeWidth={1.5}
          transform="rotate(-90 8.991 8.241)"
        />
        <Path
          data-name="Path 54207"
          d="M.165 0h11.726a.181.181 0 01.165.193v5.118a.181.181 0 01-.165.193H.165A.181.181 0 010 5.311V.193A.181.181 0 01.165 0z"
          transform="rotate(-90 8.991 8.241) translate(1.347 1.369)"
          fill="#3ba700"
        />
        <Path
          data-name="Path 54208"
          d="M16.482 2.747v2.747"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={1.5}
          transform="rotate(-90 8.991 8.241)"
        />
        {charge && (
          <G data-name="Icon ion-ios-thunderstorm-outline">
            <Path
              data-name="Path 60244"
              d="M17.792 17.332h-1.318L17 15.75h-2.373l-.495 2.637h1.724l-.966 3.165z"
              fill="#ffe13c"
              transform="translate(-111.207 -509.667) translate(100.123 501.097)"
            />
          </G>
        )}
      </G>
    </Svg>
  );
}

export default BatteryIcon;
