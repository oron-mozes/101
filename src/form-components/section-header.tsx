import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { colors, gutter } from "../shared-config";

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
    backgroundColor: colors.surface,
    color: colors.text,
    height: 32,
    lineHeight: 32,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  container: {},
});
