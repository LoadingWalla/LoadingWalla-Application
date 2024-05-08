import React from 'react';
import Svg, {Path, G, Circle} from 'react-native-svg';

const BellIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 28 28">
      <G
        id="Group_16337"
        data-name="Group 16337"
        transform="translate(-337 -42)">
        <Circle
          id="Ellipse_142"
          data-name="Ellipse 142"
          cx="14"
          cy="14"
          r="14"
          transform="translate(337 42)"
          fill="#ededed"
        />
        <Path
          id="Icon_ionic-md-notifications"
          data-name="Icon ionic-md-notifications"
          d="M12.4,19.4A1.6,1.6,0,0,0,14,17.793h-3.19A1.6,1.6,0,0,0,12.4,19.4Zm5.183-4.806V10.184A5.192,5.192,0,0,0,13.6,5.137V4.577a1.2,1.2,0,1,0-2.392,0v.561A5.192,5.192,0,0,0,7.22,10.184v4.406l-1.595,1.6v.8H19.181v-.8Z"
          transform="translate(338.397 44.615)"
          fill="#000000"
        />
      </G>
    </Svg>
  );
};

export default BellIcon;
