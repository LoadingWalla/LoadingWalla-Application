import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function CalendarIcon({props, size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14.547 13.34"
      {...props}>
      <G data-name="Icon core-calendar" stroke="#000" strokeWidth={0.07}>
        <Path
          data-name="Path 54314"
          d="M13.752 1.687h-2.654V0h-.965v1.687h-5.79V0h-.968v1.687H.724A.725.725 0 000 2.411v10.135a.725.725 0 00.724.724h13.028a.725.725 0 00.724-.724V2.412a.725.725 0 00-.724-.724zm-.241 10.616H.965v-9.65h2.41V3.86h.965V2.653h5.791V3.86h.965V2.653h2.413z"
          transform="translate(.035 .035)"
        />
        <Path
          data-name="Path 54315"
          d="M2.895 5.549h.965v.965h-.965zm2.654 0h.965v.965h-.965zm2.413 0h.965v.965h-.965zm2.654 0h.965v.965h-.961zM2.895 7.72h.965v.965h-.965zm2.654 0h.965v.965h-.965zm2.413 0h.965v.965h-.965zm2.654 0h.965v.965h-.961zM2.895 9.892h.965v.965h-.965zm2.654 0h.965v.965h-.965zm2.413 0h.965v.965h-.965zm2.654 0h.965v.965h-.961z"
          transform="translate(.035 .035)"
        />
      </G>
    </Svg>
  );
}

export default CalendarIcon;
