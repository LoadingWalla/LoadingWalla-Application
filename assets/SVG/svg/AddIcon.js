import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AddIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}>
      {/* <Path d="M20 14h-6v6h-4v-6H4v-4h6V4h4v6h6v4z" fill={color} /> */}
      <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
    </Svg>
  );
}

export default AddIcon;
