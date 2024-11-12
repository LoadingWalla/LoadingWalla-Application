import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Wrong(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13 6.5a6.483 6.483 0 01-1.904 4.596A6.483 6.483 0 016.5 13a6.483 6.483 0 01-4.596-1.904A6.483 6.483 0 010 6.5c0-1.795.729-3.421 1.904-4.596A6.483 6.483 0 016.5 0c1.795 0 3.421.729 4.596 1.904A6.483 6.483 0 0113 6.5z"
        fill="#FF270E"
      />
      <Path
        d="M9.533 4.567l-1.1-1.1L6.5 5.4 4.567 3.467l-1.1 1.1L5.4 6.5 3.467 8.433l1.1 1.1L6.5 7.6l1.933 1.933 1.1-1.1L7.6 6.5l1.933-1.933z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Wrong
