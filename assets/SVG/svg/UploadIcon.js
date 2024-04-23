import React from 'react';
import {Path, Svg} from 'react-native-svg';

const UploadIcon = ({size, color, style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={style}
      viewBox="0 0 24 24">
      <Path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" fill={color} />
    </Svg>
  );
};

export default UploadIcon;
