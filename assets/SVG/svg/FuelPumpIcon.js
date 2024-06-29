import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FuelPumpIcon({size, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18">
      <Path
        data-name="Icon fa-solid-gas-pump"
        d="M1.125 2.25A2.252 2.252 0 013.375 0H9a2.252 2.252 0 012.25 2.25V9h.281a3.094 3.094 0 013.094 3.094v1.125a.844.844 0 001.688 0V7.8a2.252 2.252 0 01-1.687-2.18V3.375L13.5 2.25a.8.8 0 011.125-1.125l2.718 2.718A2.251 2.251 0 0118 5.435v7.784a2.531 2.531 0 01-5.062 0v-1.125a1.406 1.406 0 00-1.406-1.406h-.282v5.062a1.125 1.125 0 010 2.25H1.125a1.125 1.125 0 010-2.25zm2.25.563v3.375a.564.564 0 00.563.563h4.5A.564.564 0 009 6.188V2.813a.564.564 0 00-.562-.562h-4.5a.564.564 0 00-.563.562z"
        fill={color}
      />
    </Svg>
  );
}

export default FuelPumpIcon;
