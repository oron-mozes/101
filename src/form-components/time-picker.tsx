import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import {
  borderSetup,
  offset,
  colors,
  gutter,
  inputHeight,
} from "../shared-config";
import date from "date-and-time";

export function TimePicker({
  label,
  onChange,
  value = new Date().getTime(),
  editable = true,
}: {
  editable: boolean;
  label: string;
  value?: number;
  onChange(value: number): void;
}) {
  const [showTime, toggleTime] = useState<boolean>(false);

  useEffect(() => {
    onChange(value);
  }, []);
  console.log(editable);
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
          display="spinner"
          disabled={!editable}
          value={new Date(value)}
          mode="time"
          is24Hour={true}
          onChange={(data) => {
            toggleTime(false);

            if (
              data.nativeEvent.timestamp !== 0 &&
              data.nativeEvent.timestamp < new Date().getTime()
            ) {
              onChange(data.nativeEvent.timestamp);
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
