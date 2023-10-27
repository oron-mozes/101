import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export interface ISectionHeader {
  label: string;
}
export function SectionHeader({ label }: ISectionHeader) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "rgba(204, 228, 255, 1)",
    color: "rgba(0, 36, 77, 1)",
    height: 32,
    lineHeight: 32,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    margin: 8,
  },
  container: {},
});
