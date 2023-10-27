import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function HeartSVG() {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
      <G clipPath="url(#clip0_37_226811)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.413 2.495A6.5 6.5 0 0122.498 13.1l-8.84 8.84a1 1 0 01-1.414 0l-8.84-8.84a6.501 6.501 0 119.194-9.194l.353.353.353-.353a6.502 6.502 0 012.11-1.41zM17.901 4a4.5 4.5 0 00-3.182 1.319l-1.06 1.06a1 1 0 01-1.415 0l-1.06-1.06a4.501 4.501 0 00-6.366 6.366l8.133 8.133 8.133-8.133A4.501 4.501 0 0017.901 4z"
          fill="#496C83"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_37_226811">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
