import { Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "../../../hooks/useMyTranslation";
import * as Application from "expo-application";

export function StationHeader() {
  const translation = useTranslation();
  return (
    <>
      <Image source={require("./101-station.png")} width={114} />
      <Text variant="headlineSmall" style={[styles.title]}>
        {translation("station")}
      </Text>
      <Text variant="bodySmall">{Application.nativeApplicationVersion}</Text>
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
