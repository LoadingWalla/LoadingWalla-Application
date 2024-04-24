import React from 'react';
import {Circle, G, Path, Svg} from 'react-native-svg';

const HelpIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20">
      <G
        id="Group_4328"
        data-name="Group 4328"
        transform="translate(-3142 238)">
        <Circle
          id="Ellipse_63"
          data-name="Ellipse 63"
          cx="10"
          cy="10"
          r="10"
          transform="translate(3142 -238)"
          fill="#ffe4dd"
        />
        <Path
          id="Icon_awesome-question"
          data-name="Icon awesome-question"
          d="M5.772,0A4.362,4.362,0,0,0,1.9,2.049a.541.541,0,0,0,.117.74l.971.736a.54.54,0,0,0,.749-.093A2.184,2.184,0,0,1,5.6,2.319c.693,0,1.549.446,1.549,1.117,0,.508-.419.768-1.1,1.152-.8.447-1.853,1-1.853,2.4V7.2a.54.54,0,0,0,.54.54H6.362A.54.54,0,0,0,6.9,7.2v-.13c0-.965,2.82-1.005,2.82-3.616C9.722,1.492,7.683,0,5.772,0ZM5.546,8.408a1.56,1.56,0,1,0,1.56,1.56A1.561,1.561,0,0,0,5.546,8.408Z"
          transform="translate(3146.474 -233.756)"
          fill="#ef4d23"
        />
      </G>
    </Svg>
  );
};

export default HelpIcon;
