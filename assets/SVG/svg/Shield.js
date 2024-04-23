import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

const Shield = ({size, color, verified, style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={style}
      viewBox="0 0 8.45 9.35">
      <G id="unprotected_12897997" transform="translate(-3.251 -2.318)">
        <Path
          id="Path_47918"
          data-name="Path 47918"
          d="M7.475,11.668a1.331,1.331,0,0,1-.465-.085A5.817,5.817,0,0,1,3.251,6.162V4.129a.362.362,0,0,1,.145-.29L5.327,2.39a.361.361,0,0,1,.217-.072H9.408a.364.364,0,0,1,.217.072l1.931,1.449a.363.363,0,0,1,.145.29V6.162a5.816,5.816,0,0,1-3.757,5.421,1.333,1.333,0,0,1-.469.085ZM3.975,4.31V6.162A5.088,5.088,0,0,0,7.262,10.9a.6.6,0,0,0,.426,0,5.09,5.09,0,0,0,3.289-4.744V4.31L9.287,3.042H5.665L3.975,4.31Z"
          transform="translate(0 0)"
          fill={color}
        />
        {verified ? (
          <></>
        ) : (
          <Path
            id="Path_47919"
            data-name="Path 47919"
            d="M10.831,9.819l.951-.951a.362.362,0,0,0-.512-.512l-.951.951-.951-.951a.362.362,0,0,0-.512.512l.951.951-.951.951a.362.362,0,1,0,.512.512l.951-.951.951.951a.362.362,0,0,0,.512-.512l-.951-.951Z"
            transform="translate(-2.843 -3.067)"
            fill={color}
          />
        )}
      </G>
    </Svg>
  );
};

export default Shield;
