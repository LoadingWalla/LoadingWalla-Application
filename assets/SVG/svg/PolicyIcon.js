import React from 'react';
import {Circle, G, Path, Svg} from 'react-native-svg';

const PolicyIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20">
      <G
        id="Group_4327"
        data-name="Group 4327"
        transform="translate(-3142 273)">
        <Circle
          id="Ellipse_62"
          data-name="Ellipse 62"
          cx="10"
          cy="10"
          r="10"
          transform="translate(3142 -273)"
          fill="#f0f0f0"
        />
        <Path
          id="Icon_awesome-user-lock"
          data-name="Icon awesome-user-lock"
          d="M3.978,4.546A2.273,2.273,0,1,0,1.7,2.273,2.273,2.273,0,0,0,3.978,4.546Zm1.7,1.136a1.12,1.12,0,0,1,.144-.542,2.43,2.43,0,0,0-.257-.027h-.3a3.091,3.091,0,0,1-2.589,0h-.3A2.387,2.387,0,0,0,0,7.5v.739a.852.852,0,0,0,.852.852H5.84a1.128,1.128,0,0,1-.158-.568ZM10.8,5.114h-.568V3.694a1.421,1.421,0,0,0-2.841,0V5.114H6.819a.568.568,0,0,0-.568.568V8.524a.568.568,0,0,0,.568.568H10.8a.568.568,0,0,0,.568-.568V5.682A.568.568,0,0,0,10.8,5.114ZM8.808,7.671A.568.568,0,1,1,9.376,7.1.568.568,0,0,1,8.808,7.671Zm.568-2.557H8.239V3.694a.568.568,0,0,1,1.136,0Z"
          transform="translate(3146.143 -267.798)"
          fill="#000000"
        />
      </G>
    </Svg>
  );
};

export default PolicyIcon;
