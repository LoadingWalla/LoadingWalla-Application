import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Correct(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_267_11050)">
        <Path
          d="M6.5 12.939A6.439 6.439 0 106.5.061a6.439 6.439 0 000 12.878z"
          fill="#32BA7C"
        />
        <Path
          d="M4.855 9.405l3.31 3.31A6.435 6.435 0 0012.94 6.5v-.183l-2.6-2.397-5.484 5.485z"
          fill="#0AA06E"
        />
        <Path
          d="M6.663 7.942a.76.76 0 010 1.056l-.59.59a.76.76 0 01-1.056 0l-2.58-2.6a.76.76 0 010-1.057l.59-.589a.76.76 0 011.056 0l2.58 2.6z"
          fill="#fff"
        />
        <Path
          d="M8.917 3.453a.76.76 0 011.057 0l.589.59a.76.76 0 010 1.055l-4.47 4.449a.76.76 0 01-1.055 0l-.59-.59a.76.76 0 010-1.055l4.47-4.449z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_267_11050">
          <Path fill="#fff" d="M0 0H13V13H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Correct
