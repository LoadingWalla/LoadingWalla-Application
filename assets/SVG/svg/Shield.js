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

    // <Svg
    //   width={size}
    //   height={size}
    //   style={style}
    //   viewBox="0 0 20 20"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg">
    //   <Path
    //     d="M10.773 3.12276L15.5077 4.38534C15.9454 4.50207 16.25 4.89852 16.25 5.35157V9.70552C16.25 11.7116 15.2474 13.585 13.5782 14.6978L10.5547 16.7135C10.2188 16.9374 9.7812 16.9374 9.4453 16.7135L6.4218 14.6978C4.75261 13.585 3.75 11.7116 3.75 9.70552V5.35157C3.75 4.89852 4.05458 4.50207 4.49234 4.38534L9.22701 3.12276C9.73349 2.9877 10.2665 2.9877 10.773 3.12276Z"
    //     stroke={color}
    //     stroke-linecap="round"
    //   />
    //   <Path
    //     d="M8.00014 11.3403L12 7.34046"
    //     stroke={color}
    //     stroke-linecap="round"
    //   />
    //   <Path
    //     d="M11.9999 11.3408L7.99999 7.34095"
    //     stroke={color}
    //     stroke-linecap="round"
    //   />
    // </Svg>
  );
};

export default Shield;
