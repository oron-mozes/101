import { Image } from "react-native";
import { Text } from "react-native-paper";
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
      <Image
        source={require("./touniquet.png")}
        width={32}
        height={32}
        style={{ right: xPos - 17, top: yPos - 17, position: "absolute" }}
      />
      <Text
        style={{
          backgroundColor: "#0F8A61",
          color: "white",
          fontSize: 12,
          width: 40,
          right: xPos - 55,
          top: yPos - 10,
          position: "absolute",
          borderRadius: 10,
          padding: 2,
          textAlign: "center",
        }}
      >
        {convertToTime(text)}
      </Text>
    </>
  );
}
