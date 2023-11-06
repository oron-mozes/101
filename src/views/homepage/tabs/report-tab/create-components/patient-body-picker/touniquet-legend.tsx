import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function TouniquetLegend() {
  return (
    <Svg width={18} height={19} viewBox="0 0 18 19" fill="none">
      <G clipPath="url(#clip0_231_37895)" fill="#0F8A61">
        <Path d="M5.406 5.529a.6.6 0 00-.849.849l.955.954a.6.6 0 10.848-.848l-.954-.955zM8.27 8.393a.6.6 0 00-.849.848l1.91 1.91a.6.6 0 00.848-.849l-1.91-1.91zM12.088 12.211a.6.6 0 00-.849.849l.955.954a.6.6 0 00.849-.848l-.955-.955z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.096 2.029L1.207 5.918a2.2 2.2 0 000 3.111l8.485 8.486a2.2 2.2 0 003.112 0l3.889-3.89a2.2 2.2 0 000-3.11L8.207 2.028a2.2 2.2 0 00-3.11 0zM2.056 8.18a1 1 0 010-1.414l3.889-3.89a1 1 0 011.414 0l8.485 8.486a1 1 0 010 1.414l-3.889 3.889a1 1 0 01-1.414 0L2.056 8.181z"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_231_37895">
          <Path fill="#fff" transform="translate(0 .572)" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
