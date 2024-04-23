import React from 'react';
import {Path, Svg} from 'react-native-svg';

const LocationIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 10.211 13.595">
      <Path
        id="Icon_material-location-on"
        data-name="Icon material-location-on"
        d="M12.605,3A4.937,4.937,0,0,0,7.5,7.758c0,3.569,5.105,8.836,5.105,8.836s5.105-5.268,5.105-8.836A4.937,4.937,0,0,0,12.605,3Zm0,6.457a1.765,1.765,0,0,1-1.823-1.7,1.828,1.828,0,0,1,3.647,0A1.765,1.765,0,0,1,12.605,9.457Z"
        transform="translate(-7.5 -3)"
        fill={color}
        // opacity="0.723"
      />
    </Svg>
  );
};

export default LocationIcon;
