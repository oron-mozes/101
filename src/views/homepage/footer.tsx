import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { TAB_STATUS } from ".";
import { useTranslation } from "../../hooks/useMyTranslation";

export function HomepageFooter({
  onViewChange,
  selected,
}: {
  selected: TAB_STATUS;
  onViewChange(view: TAB_STATUS): void;
}) {
  const translation = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onViewChange(TAB_STATUS.CREATE)}>
        <View style={styles.textBox}>
          {selected === TAB_STATUS.CREATE ? (
            <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
              <Path
                d="M5.5 2a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3h-14z"
                fill="#00244D"
              />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 7a1 1 0 011 1v8a1 1 0 11-2 0V8a1 1 0 011-1z"
                fill="#fff"
              />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 12a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"
                fill="#fff"
              />
            </Svg>
          ) : (
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
          )}

          <Text style={styles.text}>{translation("addPatient")}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => onViewChange(TAB_STATUS.STATUS)}>
        <View style={styles.textBox}>
          {selected === TAB_STATUS.STATUS ? (
            <Svg width={23} height={22} viewBox="0 0 23 22" fill="none">
              <Path
                d="M16.45.884a6.5 6.5 0 00-4.598 1.905l-.352.353-.353-.353a6.501 6.501 0 00-9.194 9.194l8.84 8.84a1 1 0 001.414 0l8.84-8.84A6.5 6.5 0 0016.45.884z"
                fill="#00244D"
              />
            </Svg>
          ) : (
            <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
              <G clipPath="url(#clip0_37_226811)">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.413 2.495A6.5 6.5 0 0122.498 13.1l-8.84 8.84a1 1 0 01-1.414 0l-8.84-8.84a6.501 6.501 0 119.194-9.194l.353.353.353-.353a6.502 6.502 0 012.11-1.41zM17.901 4a4.5 4.5 0 00-3.182 1.319l-1.06 1.06a1 1 0 01-1.415 0l-1.06-1.06a4.501 4.501 0 00-6.366 6.366l8.133 8.133 8.133-8.133A4.501 4.501 0 0017.901 4z"
                  fill="#496C83"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_37_226811">
                  <Path
                    fill="#fff"
                    transform="translate(.5)"
                    d="M0 0H24V24H0z"
                  />
                </ClipPath>
              </Defs>
            </Svg>
          )}
          <Text style={styles.text}>{translation("patientsStatus")}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 64,
    elevation: 5,
    flexDirection: "row",
  },
  textBox: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  text: {
    marginRight: 8,
  },
});
