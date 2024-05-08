import React from 'react';
import Svg, {Path, G, Rect, Defs, ClipPath} from 'react-native-svg';

const BookingActiveIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15 14"
      fill="none">
      <Path d="M4.5 3.5V0.5V3.5Z" fill="#EF4D23" />
      <Path
        d="M4.5 3.5V0.5"
        stroke="#EF4D23"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M7.5 3.5V0.5V3.5Z" fill="#EF4D23" />
      <Path
        d="M7.5 3.5V0.5"
        stroke="#EF4D23"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M10.5 3.5V0.5V3.5Z" fill="#EF4D23" />
      <Path
        d="M10.5 3.5V0.5"
        stroke="#EF4D23"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13 2H2C1.44771 2 1 2.44772 1 3V12.5C1 13.0523 1.44771 13.5 2 13.5H13C13.5523 13.5 14 13.0523 14 12.5V3C14 2.44772 13.5523 2 13 2Z"
        fill="#EF4D23"
        stroke="#EF4D23"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.7502 8.03571L7.03591 10.1786L6.17877 9.53571"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default BookingActiveIcon;
