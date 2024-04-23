import React from 'react';
import {Path, Svg} from 'react-native-svg';

const PencilIcon = ({size, color, style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={style}
      viewBox="0 0 16.287 16.287">
      <Path
        id="Icon_material-edit"
        data-name="Icon material-edit"
        d="M4.5,17.39v3.393H7.893L17.9,10.777,14.506,7.384ZM20.522,8.153a.9.9,0,0,0,0-1.276L18.405,4.761a.9.9,0,0,0-1.276,0L15.474,6.416l3.393,3.393Z"
        transform="translate(-4.5 -4.496)"
        fill={color}
      />
    </Svg>
  );
};

export default PencilIcon;
