import React from 'react';
import {G, Svg, Circle, Path} from 'react-native-svg';

const LogoutIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20">
      <G id="Group_4340" data-name="Group 4340" transform="translate(-3142 84)">
        <Circle
          id="Ellipse_66"
          data-name="Ellipse 66"
          cx="10"
          cy="10"
          r="10"
          transform="translate(3142 -84)"
          fill="#f0f0f0"
        />
        <Path
          id="Icon_open-account-logout"
          data-name="Icon open-account-logout"
          d="M4.232,0V1.411H9.875V8.464H4.232V9.875h7.053V0ZM2.821,2.821,0,4.937,2.821,7.053V5.643H8.464V4.232H2.821Z"
          transform="translate(3145 -79.232)"
          fill="#000000"
        />
      </G>
    </Svg>
  );
};

export default LogoutIcon;
