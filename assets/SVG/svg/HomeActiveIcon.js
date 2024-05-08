import React from 'react';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

const HomeActiveIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none">
      <G clip-Path="url(#clip0_5_98)">
        <Path
          d="M13.5 6.94C13.501 6.8012 13.473 6.66372 13.4179 6.53632C13.3628 6.40892 13.2818 6.29438 13.18 6.2L7.00002 0.5L0.820023 6.2C0.718248 6.29438 0.637236 6.40892 0.582143 6.53632C0.52705 6.66372 0.499084 6.8012 0.500023 6.94V12.5C0.500023 12.7652 0.60538 13.0196 0.792916 13.2071C0.980452 13.3946 1.23481 13.5 1.50002 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3947 13.0196 13.5 12.7652 13.5 12.5V6.94Z"
          fill="#EF4D23"
          stroke="#EF4D23"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7.5 9.5C7.5 9.22386 7.27614 9 7 9C6.72386 9 6.5 9.22386 6.5 9.5H7.5ZM7.5 13.5V9.5H6.5V13.5H7.5Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5_98">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HomeActiveIcon;
