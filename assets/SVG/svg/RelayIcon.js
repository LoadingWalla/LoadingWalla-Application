import * as React from 'react';
import Svg, {Defs, ClipPath, Path, G} from 'react-native-svg';

function RelayIcon({size, color}) {
  return (
    <Svg
      data-name="Group 24360"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      //   width={14.562}
      //   height={18.5}
      viewBox="0 0 14.562 18.5">
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 10311"
            fill={color}
            d="M0 0H14.561V18.5H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 24359" clipPath="url(#a)">
        <Path
          data-name="Path 66241"
          d="M.5 14.845V4.918a.842.842 0 01.851-.851.852.852 0 01.85.851v4.838a.46.46 0 00.92 0v-7.2a.812.812 0 01.817-.8h.09a.807.807 0 01.808.8v7.2a.46.46 0 00.92 0V1.308A.807.807 0 016.561.5h.094a.8.8 0 01.816.808v8.448a.46.46 0 00.92 0V2.423a.806.806 0 01.8-.8h.094a.811.811 0 01.813.808v9.281l-.357.608h-.562c-.129 0-.257.007-.385.02a3.762 3.762 0 00-1.033.255 3.848 3.848 0 00-1.384.961.46.46 0 10.675.624 2.928 2.928 0 011.048-.737 2.845 2.845 0 011.074-.208h.829a.46.46 0 00.4-.227l.559-.95c0-.006 0-.012.006-.018l1.86-3.14a.912.912 0 01.811-.461.951.951 0 01.568.179.963.963 0 01.335 1.108l-2.288 5.934a3.5 3.5 0 01-.786 1.218l-.605.6a3.674 3.674 0 01-2.597 1.062H4.194A3.7 3.7 0 01.5 14.845z"
          transform="translate(-.27 -.27)"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default RelayIcon;
