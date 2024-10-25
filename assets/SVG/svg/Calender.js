import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Calender(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.462 3.192A1.462 1.462 0 001 4.654v13.884A1.462 1.462 0 002.462 20h16.076A1.462 1.462 0 0020 18.538V4.654a1.462 1.462 0 00-1.462-1.462h-2.923M1 8.308h19M5.385 1v4.385M15.615 1v4.385M5.385 3.192h7.308"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Calender;
