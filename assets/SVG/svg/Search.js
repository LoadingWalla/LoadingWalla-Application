import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Search(props) {
  return (
    <Svg
      width={11}
      height={11}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM14 14l-3.5-3.5"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Search;
