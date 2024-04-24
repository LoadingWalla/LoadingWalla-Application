import React from 'react';
import {Path, Svg} from 'react-native-svg';

const UserDetailsIcon = ({size, color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18.465 12.926">
      <Path
        id="Icon_awesome-user-friends"
        data-name="Icon awesome-user-friends"
        d="M5.54,8.713A3.231,3.231,0,1,0,2.308,5.481,3.23,3.23,0,0,0,5.54,8.713Zm2.216.923H7.516a4.461,4.461,0,0,1-3.953,0H3.324A3.325,3.325,0,0,0,0,12.96v.831a1.385,1.385,0,0,0,1.385,1.385H9.694a1.385,1.385,0,0,0,1.385-1.385V12.96A3.325,3.325,0,0,0,7.755,9.636Zm6.093-.923a2.77,2.77,0,1,0-2.77-2.77A2.77,2.77,0,0,0,13.849,8.713Zm1.385.923h-.11a3.638,3.638,0,0,1-2.55,0h-.11a3.2,3.2,0,0,0-1.607.444A4.222,4.222,0,0,1,12,12.96v1.108c0,.063-.014.124-.017.185h5.1a1.385,1.385,0,0,0,1.385-1.385,3.23,3.23,0,0,0-3.231-3.231Z"
        transform="translate(0 -2.25)"
        fill={color}
      />
    </Svg>
  );
};

export default UserDetailsIcon;
