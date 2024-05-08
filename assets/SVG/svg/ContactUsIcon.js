import React from 'react';
import {G, Svg, Circle, Path} from 'react-native-svg';

const ContactUsIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20">
      <G
        id="Group_4325"
        data-name="Group 4325"
        transform="translate(-3142 342)">
        <Circle
          id="Ellipse_60"
          data-name="Ellipse 60"
          cx="10"
          cy="10"
          r="10"
          transform="translate(3142 -342)"
          fill="#f0f0f0"
        />
        <Path
          id="Icon_material-perm-contact-calendar"
          data-name="Icon material-perm-contact-calendar"
          d="M13.068,2.571h-.536V1.5H11.462V2.571H7.178V1.5H6.107V2.571H5.571A1.071,1.071,0,0,0,4.5,3.642v7.5A1.071,1.071,0,0,0,5.571,12.21h7.5a1.074,1.074,0,0,0,1.071-1.071v-7.5A1.074,1.074,0,0,0,13.068,2.571ZM9.32,4.178A1.607,1.607,0,1,1,7.713,5.784,1.6,1.6,0,0,1,9.32,4.178ZM12.533,10.6H6.107v-.536c0-1.071,2.142-1.66,3.213-1.66s3.213.589,3.213,1.66Z"
          transform="translate(3142.831 -338.907)"
          fill="#000000"
        />
      </G>
    </Svg>
  );
};

export default ContactUsIcon;
