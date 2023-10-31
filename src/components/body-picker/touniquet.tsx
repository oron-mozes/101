import {
  ForeignObject,
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  Text,
} from "react-native-svg";
import { convertToTime } from "./utils";

export function Touniquet({
  xPos,
  yPos,
  text,
}: {
  xPos: number;
  yPos: number;
  text: string | number;
}) {
  return (
    <>
      <ForeignObject y={yPos} x={xPos} width={100} height={50} fill="none">
        <G clipPath="url(#clip0_197_31167)">
          <Rect
            y={4.79578}
            width={39}
            height={16.001}
            rx={8.0005}
            fill="#0F8A61"
          />
        </G>
        <Path
          d="M50.208 7.315a.79.79 0 00-1.131 0 .823.823 0 000 1.15l1.272 1.295a.79.79 0 001.132 0 .823.823 0 000-1.151l-1.273-1.294zM54.026 11.198a.79.79 0 00-1.131 0 .823.823 0 000 1.15l2.545 2.59a.79.79 0 001.132 0 .823.823 0 000-1.151l-2.546-2.59zM59.117 16.375a.79.79 0 00-1.13 0 .823.823 0 000 1.151l1.272 1.294a.79.79 0 001.131 0 .823.823 0 000-1.15l-1.273-1.295z"
          fill="#0F8A61"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.795 2.568L44.61 7.842a3.02 3.02 0 000 4.219l11.313 11.506a2.899 2.899 0 004.149 0l5.185-5.274a3.02 3.02 0 000-4.219L53.943 2.568a2.899 2.899 0 00-4.148 0zm-4.054 8.342a1.372 1.372 0 010-1.917l5.185-5.274c.521-.53 1.365-.53 1.886 0l11.314 11.506c.52.53.52 1.388 0 1.917l-5.186 5.274c-.52.53-1.365.53-1.885 0L45.74 10.91z"
          fill="#0F8A61"
        />
        <Defs>
          <ClipPath id="clip0_197_31167">
            <Rect
              y={4.79578}
              width={39}
              height={16.001}
              rx={8.0005}
              fill="#fff"
            />
          </ClipPath>
        </Defs>
      </ForeignObject>
      <Text x={xPos + 4} fill="#fff" y={yPos + 16} fontSize="12">
        {convertToTime(text)}
      </Text>
    </>
  );
}
