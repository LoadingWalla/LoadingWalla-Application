import React from 'react';
import {Circle, G, Path, Svg} from 'react-native-svg';

const CheckCircle = ({size, style, color, strokeColor}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={style}
      viewBox="0 0 8 8">
      <G
        id="Group_16672"
        data-name="Group 16672"
        transform="translate(3061 3769)">
        <Circle
          id="Ellipse_163"
          data-name="Ellipse 163"
          cx="4"
          cy="4"
          r="4"
          transform="translate(-3061 -3769)"
          fill={color}
        />
        <Path
          id="Icon_material-done"
          data-name="Icon material-done"
          d="M6.382,10.826,5.42,9.865l-.32.32,1.282,1.282L9.128,8.72l-.32-.32Z"
          transform="translate(-3064.114 -3774.933)"
          fill="#ED1C24"
          stroke={strokeColor ? strokeColor : '#ED1C24'}
          stroke-width="0.5"
        />
      </G>
    </Svg>
  );
};

export default CheckCircle;
