import React from 'react';
import Svg, {Path} from 'react-native-svg';

const DashboardIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18.332 18.332">
      <Path
        id="Icon_material-dashboard"
        data-name="Icon material-dashboard"
        d="M4.5,14.129h7.7V4.5H4.5Zm0,7.7h7.7V16.055H4.5Zm9.629,0h7.7V12.2h-7.7Zm0-17.332v5.777h7.7V4.5Z"
        transform="translate(-4 -4)"
        fill="none"
        stroke="#000"
        stroke-width="1"
      />
    </Svg>
  );
};

export default DashboardIcon;
