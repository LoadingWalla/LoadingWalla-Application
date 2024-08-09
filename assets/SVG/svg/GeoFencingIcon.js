import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function GeoFencingIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17.083 17.083">
      <Path
        data-name="Icon material-radar"
        d="M18.153 16.948a8.547 8.547 0 10-.538.6c.026-.026.043-.051.06-.068a6.864 6.864 0 00.478-.532zm-6.611 1.426a6.833 6.833 0 116.833-6.833 6.768 6.768 0 01-1.444 4.185l-1.221-1.22a5.182 5.182 0 10-1.2 1.2l1.213 1.213a6.681 6.681 0 01-4.181 1.456zm1.64-6.4a1.692 1.692 0 00-.419-1.623l-.017-.017a1.7 1.7 0 00-2.375-.034c-.009.009-.026.017-.043.034a1.712 1.712 0 000 2.417l.017.017a1.687 1.687 0 001.631.419l1.29 1.29a3.368 3.368 0 01-1.742.5 3.417 3.417 0 113.417-3.417 3.336 3.336 0 01-.478 1.708l-1.281-1.29z"
        transform="translate(-3 -3)"
        fill={color}
      />
    </Svg>
  );
}

export default GeoFencingIcon;
