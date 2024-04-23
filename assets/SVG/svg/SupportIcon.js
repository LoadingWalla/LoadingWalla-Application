import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const SupportIcon = ({size}) => {
  return (
    <Svg
      id="Group_16336"
      data-name="Group 16336"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 28 28">
      <Circle
        id="Ellipse_143"
        data-name="Ellipse 143"
        cx="14"
        cy="14"
        r="14"
        fill="#ededed"
      />
      <Path
        id="headset_3682050"
        d="M10.892,9.85a7.665,7.665,0,0,0-3.825,6.407l-.182.049c-1.345.36-2,2.254-1.463,4.246S7.467,23.857,8.812,23.5l.791-.213c.422-.113.629-.7.463-1.313l-1.2-4.487V16.49a5.859,5.859,0,1,1,11.719,0v1l-1.132,4.223A5.931,5.931,0,0,1,17.7,23.25a5.725,5.725,0,0,1-1.085.48.9.9,0,0,0-.759-.539h-2.53c-.534,0-.962.617-.962,1.384v.153c0,.765.427,1.383.962,1.383h2.53a.969.969,0,0,0,.835-.7,7.441,7.441,0,0,0,3.471-2.04l.476.128c1.344.36,2.857-.955,3.39-2.946s-.118-3.886-1.463-4.246l-.182-.05A7.663,7.663,0,0,0,10.892,9.85Z"
        transform="translate(-0.723 -3.468)"
        fill="#707070"
      />
    </Svg>
  );
};

export default SupportIcon;
