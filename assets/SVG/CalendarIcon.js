import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CalendarIcon({props, size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      {...props}>
      <Path
        d="M7 11h2v2H7v-2m14-6v14c0 1.11-.89 2-2 2H5a2 2 0 01-2-2V5c0-1.1.9-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 012 2M5 7h14V5H5v2m14 12V9H5v10h14m-4-6v-2h2v2h-2m-4 0v-2h2v2h-2m-4 2h2v2H7v-2m8 2v-2h2v2h-2m-4 0v-2h2v2h-2z"
        fill={color}
      />
    </Svg>
  );
}

export default CalendarIcon;
