import React from 'react';
import {ClipPath, Defs, G, Mask, Path, Rect, Svg} from 'react-native-svg';

const LoadIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none">
      <G clip-Path="url(#clip0_4_28)">
        <Path
          d="M12.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V12.5C0.5 13.0523 0.947715 13.5 1.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V1.5C13.5 0.947715 13.0523 0.5 12.5 0.5Z"
          stroke="#363636"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9 0.5V5.5C9 5.63261 8.94732 5.75979 8.85355 5.85355C8.75979 5.94732 8.63261 6 8.5 6H5.5C5.36739 6 5.24021 5.94732 5.14645 5.85355C5.05268 5.75979 5 5.63261 5 5.5V0.5"
          stroke="#363636"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.5 11H11"
          stroke="#363636"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4_28">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LoadIcon;
