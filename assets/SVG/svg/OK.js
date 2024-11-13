import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function OK(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={9} cy={9} r={9} fill="#379D00" />
      <Path
        d="M6.543 12.101h0L4.76 10.473s0 0 0 0a.805.805 0 01-.261-.586.782.782 0 01.26-.585.837.837 0 01.574-.22.86.86 0 01.574.22h0l-.338.369.339-.368.634 2.798zm0 0c.284.26.66.399 1.045.399.385 0 .761-.139 1.046-.399h0l4.605-4.21-6.696 4.21zm5.549-5.38L7.588 10.84l5.651-2.95a.805.805 0 00.261-.584.783.783 0 00-.261-.586l-.337.37.338-.369a.837.837 0 00-.574-.221.86.86 0 00-.574.221s0 0 0 0z"
        fill="#fff"
        stroke="#fff"
      />
    </Svg>
  )
}

export default OK;
