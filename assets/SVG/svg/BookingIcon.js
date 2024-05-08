import React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const BookingIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none">
      <Path
        d="M4 3.5V0.5"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7 3.5V0.5"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 3.5V0.5"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.5 2H1.5C0.947715 2 0.5 2.44772 0.5 3V12.5C0.5 13.0523 0.947715 13.5 1.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V3C13.5 2.44772 13.0523 2 12.5 2Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.2502 8.03571L6.53591 10.1786L5.67877 9.53571"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default BookingIcon;
