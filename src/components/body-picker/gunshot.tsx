import { Image } from "react-native";

export function Gunshot({ xPos, yPos }: { xPos: number; yPos: number }) {
  return (
    <Image
      source={require("./gunshot.png")}
      width={32}
      height={32}
      style={{ right: xPos - 17, top: yPos - 17, position: "absolute" }}
    />
  );
}
