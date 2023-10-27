import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import Svg, { Path } from "react-native-svg";

export function HomepageFooter({
  onViewChange,
}: {
  onViewChange(view: "status" | "create"): void;
}) {
  const translation = useTranslation();
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.textBox} onPress={() => onViewChange("status")}>
        {translation("patientsStatus")}
        <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 4a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-14zm-3 1a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3h-14a3 3 0 01-3-3V5z"
            fill="#496C83"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 7a1 1 0 011 1v8a1 1 0 11-2 0V8a1 1 0 011-1z"
            fill="#496C83"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 12a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"
            fill="#496C83"
          />
        </Svg>
      </Text>

      <Text style={styles.textBox} onPress={() => onViewChange("create")}>
        {translation("addPatient")}
        <Svg width={23} height={22} viewBox="0 0 23 22" fill="none">
          <Path
            d="M16.45.884a6.5 6.5 0 00-4.598 1.905l-.352.353-.353-.353a6.501 6.501 0 00-9.194 9.194l8.84 8.84a1 1 0 001.414 0l8.84-8.84A6.5 6.5 0 0016.45.884z"
            fill="#00244D"
          />
        </Svg>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    backgroundColor: "pink",
    flexDirection: "row",
  },
});
