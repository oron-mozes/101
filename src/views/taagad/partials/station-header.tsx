import { Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "../../../hooks/useMyTranslation";

export function StationHeader() {
  const translation = useTranslation();
  return (
    <>
      <Image source={require("./101-station.png")} width={114} />
      <Text variant="headlineSmall" style={[styles.title]}>
        {translation("station")}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
  },
});
