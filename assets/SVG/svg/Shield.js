import React from 'react';
import {Path, Svg} from 'react-native-svg';

const Shield = ({size, color, verified, style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.773 3.12276L15.5077 4.38534C15.9454 4.50207 16.25 4.89852 16.25 5.35157V9.70552C16.25 11.7116 15.2474 13.585 13.5782 14.6978L10.5547 16.7135C10.2188 16.9374 9.7812 16.9374 9.4453 16.7135L6.4218 14.6978C4.75261 13.585 3.75 11.7116 3.75 9.70552V5.35157C3.75 4.89852 4.05458 4.50207 4.49234 4.38534L9.22701 3.12276C9.73349 2.9877 10.2665 2.9877 10.773 3.12276Z"
        stroke={verified ? '#119500' : '#C30000'}
        stroke-linecap="round"
      />
      {verified ? (
        <Path
          d="M7.91667 9.58337L9.40656 11.0733C9.50419 11.1709 9.66248 11.1709 9.76011 11.0733L12.5 8.33337"
          stroke="#119500"
          stroke-linecap="round"
        />
      ) : (
        <>
          <Path
            d="M8.00014 11.3403L12 7.34046"
            stroke="#C30000"
            stroke-linecap="round"
          />
          <Path
            d="M11.9999 11.3408L7.99999 7.34095"
            stroke="#C30000"
            stroke-linecap="round"
          />
        </>
      )}
    </Svg>
  );
};

export default Shield;
