import { Image } from "react-native";
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from "react-native-svg";

export function Hit({ xPos, yPos }: { xPos: number; yPos: number }) {
  return (
    <Image
      source={require("./hit.png")}
      width={32}
      height={32}
      style={{ right: xPos - 17, top: yPos - 17, position: "absolute" }}
    />
  );
}
