import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function KeyIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      style={{marginLeft: 3}}
      viewBox="0 0 17.083 17.083">
      <Path
        data-name="Icon fa-solid-key"
        d="M11.211 11.745a5.861 5.861 0 10-5.6-4.081L.234 13.046a.8.8 0 00-.234.567v2.669a.8.8 0 00.8.8h2.67a.8.8 0 00.8-.8v-1.334h1.336a.8.8 0 00.8-.8v-1.335h1.335a.8.8 0 00.567-.234l1.111-1.111a5.886 5.886 0 001.792.277zM12.546 3.2a1.335 1.335 0 11-1.335 1.335A1.335 1.335 0 0112.546 3.2z"
        fill={color}
      />
    </Svg>
  );
}

export default KeyIcon;
