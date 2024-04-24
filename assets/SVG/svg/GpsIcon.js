import React from 'react';
import {G, Svg, Circle, Path} from 'react-native-svg';

const GpsIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20">
      <G id="Group_7060" data-name="Group 7060" transform="translate(-46 -416)">
        <G id="Group_4311" data-name="Group 4311" transform="translate(9 -10)">
          <Circle
            id="Ellipse_67"
            data-name="Ellipse 67"
            cx="10"
            cy="10"
            r="10"
            transform="translate(37 426)"
            fill="#ffe4dd"
          />
        </G>
        <G
          id="Group_7059"
          data-name="Group 7059"
          transform="translate(8486.976 3885.374)">
          <Path
            id="Icon_material-gps-fixed"
            data-name="Icon material-gps-fixed"
            d="M8.935,6.231a2.7,2.7,0,1,0,2.7,2.7A2.7,2.7,0,0,0,8.935,6.231Zm6.043,2.028A6.079,6.079,0,0,0,9.611,2.892V1.5H8.259V2.892A6.079,6.079,0,0,0,2.892,8.259H1.5V9.611H2.892a6.079,6.079,0,0,0,5.367,5.367V16.37H9.611V14.978a6.079,6.079,0,0,0,5.367-5.367H16.37V8.259ZM8.935,13.666a4.731,4.731,0,1,1,4.731-4.731A4.728,4.728,0,0,1,8.935,13.666Z"
            transform="translate(-8439.808 -3468.384)"
            fill="#ef4d23"
          />
        </G>
      </G>
    </Svg>
  );
};

export default GpsIcon;
