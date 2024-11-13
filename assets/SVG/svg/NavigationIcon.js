import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NavigateIcon(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.664.552c-6.065 0-11 4.934-11 11 0 6.065 4.935 11 11 11 6.066 0 11-4.935 11-11 0-6.066-4.935-11-11-11z"
        fill="#0CB0FF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.803 20.675l.035-.024a10.998 10.998 0 004.821-8.778l-5.212-6.25-4.167 10.596-3.303-3.212-.023-.022-.023-.02-.025-.02-.026-.018-.027-.017-.029-.016-.028-.015-.03-.013-5.173-2.19 7.945 7.43-.16.407 3.466 3.213a11.008 11.008 0 001.959-1.05z"
        fill="#0092D8"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.378 18.513l-2.259-5.295a.655.655 0 00-.353-.352l-5.173-2.19 12.854-5.054-5.069 12.89z"
        fill="#fff"
      />
    </Svg>
  );
}

export default NavigateIcon;
