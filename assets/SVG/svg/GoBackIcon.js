import React from 'react';
import {Defs, Svg, Filter, G, Path} from 'react-native-svg';

const GoBackIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 22 22">
      <Defs>
        <Filter
          id="Rectangle_1871"
          x="0"
          y="0"
          width="22"
          height="22"
          filterUnits="userSpaceOnUse">
          <feOffset input="SourceAlpha" />
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feFlood flood-opacity="0.161" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </Filter>
      </Defs>
      <G
        id="Group_4287"
        data-name="Group 4287"
        transform="translate(-22.5 -109.5)">
        <G
          transform="matrix(1, 0, 0, 1, 22.5, 109.5)"
          filter="url(#Rectangle_1871)">
          <rect
            id="Rectangle_1871-2"
            data-name="Rectangle 1871"
            width="19"
            height="19"
            rx="1"
            transform="translate(1.5 1.5)"
            fill="#fff"
          />
        </G>
        <G
          id="Icon_feather-arrow-left"
          data-name="Icon feather-arrow-left"
          transform="translate(21.5 108.371)">
          <path
            id="Path_37436"
            data-name="Path 37436"
            d="M16.629,18H7.5"
            transform="translate(0 -5.935)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <Path
            id="Path_37437"
            data-name="Path 37437"
            d="M12.065,16.629,7.5,12.065,12.065,7.5"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </G>
      </G>
    </Svg>
  );
};

export default GoBackIcon;
