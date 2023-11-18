import DateTimePicker from "@react-native-community/datetimepicker";
import date from "date-and-time";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import {
  borderSetup,
  colors,
  gutter,
  inputHeight,
  offset,
} from "../shared-config";
// import { Appearance, useColorScheme } from "react-native-appearance";
import { useColorScheme } from "react-native";

export function TimePicker({
  label,
  onChange,
  value = new Date().getTime(),
  editable = true,
}: {
  editable?: boolean;
  label: string;
  value?: number;
  onChange(value: number): void;
}) {
  const [showTime, toggleTime] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    onChange(value);
  }, []);

  return (
    <TouchableOpacity
      onPress={() => editable && toggleTime(true)}
      style={[styles.container]}
    >
      <View style={[styles.content]}>
        <View>
          {!value && (
            <Text onPress={() => editable && toggleTime(true)}>{label}</Text>
          )}
          {value && (
            <Text
              onPress={() => editable && toggleTime(true)}
              style={styles.time}
            >
              {date.format(
                new Date(value === 0 ? new Date().getTime() : value),
                "HH:mm"
              )}
            </Text>
          )}
        </View>
        <Icon source="clock-outline" size={20} />
      </View>
      {value && (
        <Text onPress={() => toggleTime(true)} style={styles.offset}>
          {label}
        </Text>
      )}
      {showTime && (
        <DateTimePicker
          style={{ backgroundColor: "black" }}
          display="spinner"
          disabled={!editable}
          value={new Date(value)}
          mode="time"
          is24Hour={true}
          positiveButton={{
            label: "אישור",
            textColor: colorScheme === "light" ? "black" : "white",
          }}
          negativeButton={{
            label: "סגור",
            textColor: colorScheme === "light" ? "black" : "white",
          }}
          onChange={(data) => {
            toggleTime(false);

            if (
              data.nativeEvent.timestamp !== 0 &&
              data.nativeEvent.timestamp < new Date().getTime()
            ) {
              data.nativeEvent.utcOffset &&
                onChange(
                  data.nativeEvent.timestamp + data.nativeEvent.utcOffset
                );
            }
          }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: inputHeight,
    marginBottom: gutter * 2,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: inputHeight,
    margin: gutter,
    backgroundColor: colors.textInputBG,
    ...borderSetup,
  },
  offset: {
    ...offset,
  },
  time: {
    fontSize: 18,
  },
});
