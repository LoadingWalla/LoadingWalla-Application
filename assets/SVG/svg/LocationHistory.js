import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LocationHistory({color, size}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21.124 18.5">
      <Path
        data-name="Icon fa-solid-map-location-dot"
        d="M14.963 4.4c0 2-2.681 5.571-3.858 7.041a.69.69 0 01-1.086 0C8.842 9.972 6.161 6.4 6.161 4.4a4.4 4.4 0 118.8 0zm.293 2.949c.128-.253.246-.506.352-.755l.055-.136 4.254-1.7a.88.88 0 011.207.818v9.931a.885.885 0 01-.554.818l-5.314 2.123zM5.046 5.072a6.961 6.961 0 00.469 1.522c.106.249.224.5.352.755v9.22l-4.66 1.867A.88.88 0 010 17.618V7.687a.885.885 0 01.554-.818l4.5-1.8zm6.975 7.1a38.21 38.21 0 002.061-2.824v9.143l-7.041-2.009v-7.13A39.177 39.177 0 009.1 12.176a1.865 1.865 0 002.919 0zm-1.46-6.6A1.467 1.467 0 109.1 4.108a1.467 1.467 0 001.462 1.467z"
        fill={color}
      />
    </Svg>
  );
}

export default LocationHistory;
