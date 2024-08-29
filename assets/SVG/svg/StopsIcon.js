import * as React from 'react';
import Svg, {Circle, Path, Text, TSpan} from 'react-native-svg';

function StopsIcon({size = 40, number = 0}) {
  return (
    <Svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}>
      <Path
        data-name="Icon fa-solid-location-pin"
        d="M166.43 78.09c0 30.24-40.48 84.07-58.23 106.28-3.58 4.53-10.15 5.3-14.68 1.72-.64-.5-1.22-1.08-1.72-1.72-17.74-22.21-58.23-76.05-58.23-106.28 0-36.69 29.74-66.43 66.43-66.43s66.43 29.74 66.43 66.43z"
        fill="#ff3600"
        strokeWidth={0}
      />
      <Text
        fill="#fff"
        fontFamily="PlusJakartaSans-ExtraBold,'Plus Jakarta Sans'"
        fontSize="70px"
        fontWeight={700}
        x="50%" // Center the text horizontally
        y="50%" // Center the text vertically
        textAnchor="middle" // Aligns text horizontally centered
        dominantBaseline="middle" // Aligns text vertically centered
      >
        <TSpan>{number}</TSpan>
      </Text>
    </Svg>
  );
}

export default StopsIcon;
