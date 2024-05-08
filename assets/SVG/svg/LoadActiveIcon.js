import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

const LoadActiveIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none">
      <G clip-Path="url(#clip0_5_2)">
        <Rect width="14" height="14" rx="2" fill="#EF4D23" />
        <Path
          d="M12.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V12.5C0.5 13.0523 0.947715 13.5 1.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V1.5C13.5 0.947715 13.0523 0.5 12.5 0.5Z"
          stroke="#EF4D23"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9 0V5.45455C9 5.59921 8.94732 5.73795 8.85355 5.84024C8.75979 5.94253 8.63261 6 8.5 6H5.5C5.36739 6 5.24021 5.94253 5.14645 5.84024C5.05268 5.73795 5 5.59921 5 5.45455V0"
          stroke="white"
          stroke-linejoin="round"
        />
        <Path
          d="M8.5 11H11"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5_2">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LoadActiveIcon;
