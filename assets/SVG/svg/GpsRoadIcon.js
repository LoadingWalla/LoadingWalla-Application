import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function GpsRoadIcon({props, size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17.013 17.047"
      {...props}>
      <G fill="none" stroke={color} strokeLinecap="round" strokeWidth={1}>
        <Path
          data-name="Path 60232"
          d="M8.18 18.562l2.506-5.429c.022-.049.034-.073.049-.081a.049.049 0 01.043 0c.016.008.027.032.049.081l2.509 5.429h0c.028.062.043.092.037.11a.049.049 0 01-.033.032c-.018.005-.048-.01-.109-.04l-2.436-1.218a.1.1 0 00-.026-.011.046.046 0 00-.018 0 .1.1 0 00-.026.011l-2.439 1.218c-.061.03-.091.046-.109.04a.049.049 0 01-.033-.032c-.008-.017.008-.048.036-.11z"
          transform="translate(-2.25 -2.156)"
        />
        <Path
          data-name="Path 60233"
          d="M4.529 15.2L7.198 2.75"
          transform="translate(-2.25 -2.156)"
        />
        <Path
          data-name="Path 60234"
          d="M16.983 15.2L14.315 2.75"
          transform="translate(-2.25 -2.156)"
        />
        <Path
          data-name="Path 60235"
          d="M10.756 8.978v-1.78"
          transform="translate(-2.25 -2.156)"
        />
        <Path
          data-name="Path 60236"
          d="M15.2 15.2h.453a4.822 4.822 0 002.046-.212 1.941 1.941 0 00.848-.848 4.822 4.822 0 00.212-2.046V5.856a4.822 4.822 0 00-.212-2.046 1.941 1.941 0 00-.848-.848 4.822 4.822 0 00-2.046-.212h-9.8a4.822 4.822 0 00-2.046.212 1.941 1.941 0 00-.848.848 4.822 4.822 0 00-.209 2.046V12.1a4.822 4.822 0 00.212 2.046 1.941 1.941 0 00.848.848 4.822 4.822 0 002.046.212h.453"
          transform="translate(-2.25 -2.156)"
        />
      </G>
    </Svg>
  );
}

export default GpsRoadIcon;
