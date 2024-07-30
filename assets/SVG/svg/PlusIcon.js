import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PlusIcon({props, size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      {...props}>
      <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
    </Svg>
  );
}

export default PlusIcon;
