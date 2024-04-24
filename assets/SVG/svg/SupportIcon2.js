import React from 'react';
import {Path, Svg} from 'react-native-svg';

const SupportIcon2 = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 19.298 13.48">
      <Path
        id="Icon_metro-books"
        data-name="Icon metro-books"
        d="M6.5,8.571H3.133a.563.563,0,0,0-.562.562V21.49a.563.563,0,0,0,.562.562H6.5a.563.563,0,0,0,.562-.562V9.133A.563.563,0,0,0,6.5,8.571Zm-.562,3.37H3.695V10.818H5.942Zm6.179-3.37H8.75a.563.563,0,0,0-.562.562V21.49a.563.563,0,0,0,.562.562h3.37a.563.563,0,0,0,.562-.562V9.133A.563.563,0,0,0,12.12,8.571Zm-.562,3.37H9.312V10.818h2.247ZM16,9.44l-3.01,1.516a.563.563,0,0,0-.249.754L17.8,21.743a.563.563,0,0,0,.754.249l3.01-1.516a.563.563,0,0,0,.249-.754L16.755,9.689A.563.563,0,0,0,16,9.44Zm2.86,12.05a.562.562,0,1,1-.562-.562A.562.562,0,0,1,18.86,21.49Z"
        transform="translate(-2.571 -8.571)"
        fill={color}
      />
    </Svg>
  );
};

export default SupportIcon2;
