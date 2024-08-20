import * as React from 'react';
import Svg, {G, Ellipse, Path} from 'react-native-svg';

function LocationShadowIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 12.439">
      <G data-name="Group 24293">
        <G
          data-name="Ellipse 205"
          transform="translate(-16 -229.561) translate(16 241)"
          fill="#fff"
          stroke="#919191"
          strokeWidth={1}>
          <Ellipse cx={7} cy={0.5} rx={7} ry={0.5} stroke="none" />
          <Ellipse cx={7} cy={0.5} rx={6.5} fill="none" />
        </G>
        <Path
          data-name="Icon fa-solid-location-dot"
          d="M23.557 241.326c1.205-1.509 3.955-5.165 3.955-7.219a4.512 4.512 0 00-9.024.001c0 2.054 2.749 5.71 3.955 7.219a.71.71 0 001.114 0zM23 232.604a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5z"
          fill="#3ba700"
          stroke="#000"
          strokeWidth={0.07}
          transform="translate(-16 -229.561)"
        />
      </G>
    </Svg>
  );
}

export default LocationShadowIcon;
