import React from 'react';
import {Circle, Line, Svg} from 'react-native-svg';

const SearchIcon = ({size, color, style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-search">
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Svg>
  );
};

export default SearchIcon;
