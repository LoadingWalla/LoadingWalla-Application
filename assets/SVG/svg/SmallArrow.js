import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SmallArrow(props) {
  return (
    <Svg
      width={12}
      height={11}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 5.496a1.753 1.753 0 00-.598-1.285L7.057.267A1.07 1.07 0 006.342 0a1.07 1.07 0 00-.714.267.918.918 0 00-.221.298.843.843 0 000 .706.918.918 0 00.221.298l3.333 3.01H1.013c-.269 0-.526.096-.716.268-.19.172-.297.649-.297.649s.107.476.297.648c.19.172.447.269.716.269h7.948L5.628 9.43a.877.877 0 00-.3.648.876.876 0 00.295.65c.19.173.447.27.716.271.269 0 .527-.095.718-.267l4.345-3.944c.38-.343.596-.808.598-1.293z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SmallArrow
