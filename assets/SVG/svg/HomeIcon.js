import React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const HomeIcon = ({size}) => {
  return (
    <Svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24">
      <G id="layer2">
        <Path
          id="rect843"
          class="cls-1"
          d="m11.99,1.21c-.23,0-.46.1-.62.26L1.48,11.36c-.35.35-.35.92,0,1.27.17.17.4.26.64.26h1.8v7.19c0,1.48,1.22,2.7,2.7,2.7h2.7c.5,0,.9-.4.9-.9v-4.49h3.6v4.49c0,.5.4.9.9.9h2.7c1.48,0,2.77-1.21,2.7-2.74v.05s0-6.29,0-6.29v-.9h1.8c.5,0,.9-.4.9-.9,0-.24-.09-.47-.26-.64L12.64,1.48c-.17-.17-.41-.27-.65-.26Zm.01,2.17l7.72,7.72h-.53c-.5,0-.9.4-.9.9v8.09s0,.03,0,.05c.02.46-.39.85-.9.85h-1.8v-4.49c0-.5-.4-.9-.9-.9h-5.39c-.5,0-.9.4-.9.9v4.49h-1.8c-.51,0-.9-.39-.9-.9v-8.09c0-.5-.4-.9-.9-.9h-.53l7.72-7.72Z"
          vector-effect="none"
          stroke-width="0"
        />
      </G>
    </Svg>
  );
};

export default HomeIcon;
