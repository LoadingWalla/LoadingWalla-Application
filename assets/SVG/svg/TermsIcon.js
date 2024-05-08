import React from 'react';
import {Circle, G, Path, Svg} from 'react-native-svg';

const TermsIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20">
      <G
        id="Group_4326"
        data-name="Group 4326"
        transform="translate(-3142 307)">
        <Circle
          id="Ellipse_61"
          data-name="Ellipse 61"
          cx="10"
          cy="10"
          r="10"
          transform="translate(3142 -307)"
          fill="#f0f0f0"
        />
        <G
          id="Icon_ionic-md-bookmarks"
          data-name="Icon ionic-md-bookmarks"
          transform="translate(3147.112 -301.903)">
          <Path
            id="Path_45103"
            data-name="Path 45103"
            d="M27.554,4.5h-.54A1.05,1.05,0,0,1,27.6,5.6v7.683c0,.568-.18.959-.586,1.1h.54a1.1,1.1,0,0,0,1.1-1.1V5.6A1.1,1.1,0,0,0,27.554,4.5Z"
            transform="translate(-18.778 -4.5)"
            fill="#000000"
          />
          <Path
            id="Path_45104"
            data-name="Path 45104"
            d="M11.741,4.505c-.036,0-.072-.005-.108-.005H5.6A1.1,1.1,0,0,0,4.5,5.6v7.683a1.1,1.1,0,0,0,1.1,1.1h6.037c.036,0,.072,0,.108-.005a1.1,1.1,0,0,0,.99-1.093V5.6A1.106,1.106,0,0,0,11.741,4.505ZM8.2,9.439l-1.44-.823-1.44.823V5.323H8.2Z"
            transform="translate(-4.5 -4.5)"
            fill="#000000"
          />
        </G>
      </G>
    </Svg>
  );
};

export default TermsIcon;
