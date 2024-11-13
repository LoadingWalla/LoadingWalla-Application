import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.597 5.264L13.679.574A2.11 2.11 0 0012.224 0c-.545 0-1.068.207-1.454.575a1.917 1.917 0 00-.602 1.387c0 .52.217 1.02.603 1.387l3.344 3.19H2.057c-.546 0-1.069.206-1.455.574A1.916 1.916 0 000 8.5c0 .52.217 1.02.602 1.387a2.11 2.11 0 001.455.574h12.058l-3.344 3.19a1.917 1.917 0 00-.603 1.387c0 .52.216 1.02.602 1.387.386.368.909.575 1.454.575a2.11 2.11 0 001.455-.574l4.918-4.69A4.478 4.478 0 0020 8.5a4.478 4.478 0 00-1.403-3.236z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ArrowIcon;
