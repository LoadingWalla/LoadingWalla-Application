import React from 'react';
import {G, Path, Svg, Circle} from 'react-native-svg';

const PreviousBookingIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20">
      <G id="Group_4311" data-name="Group 4311" transform="translate(-37 -426)">
        <Circle
          id="Ellipse_67"
          data-name="Ellipse 67"
          cx="10"
          cy="10"
          r="10"
          transform="translate(37 426)"
          fill="#f0f0f0"
        />
        <G
          id="Icon_feather-repeat"
          data-name="Icon feather-repeat"
          transform="translate(42.694 430.892)">
          <Path
            id="Path_45106"
            data-name="Path 45106"
            d="M25.5,1.5l1.971,1.971L25.5,5.441"
            transform="translate(-18.603 -1.5)"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
          <Path
            id="Path_45107"
            data-name="Path 45107"
            d="M4.5,10.456V9.471A1.971,1.971,0,0,1,6.471,7.5h6.9"
            transform="translate(-4.5 -5.529)"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
          <Path
            id="Path_45108"
            data-name="Path 45108"
            d="M6.471,26.441,4.5,24.471,6.471,22.5"
            transform="translate(-4.5 -15.603)"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
          <Path
            id="Path_45109"
            data-name="Path 45109"
            d="M13.367,19.5v.985A1.971,1.971,0,0,1,11.4,22.456H4.5"
            transform="translate(-4.5 -13.588)"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
        </G>
      </G>
    </Svg>
  );
};

export default PreviousBookingIcon;
