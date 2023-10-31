import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import {
  borderRadius,
  colors,
  gutter,
  offset,
  inputContainer,
} from "../shared-config";
import date from "date-and-time";

export function DatePicker({
  label,
  onChange,
  value,
  disabled,
}: {
  disabled: boolean;
  label: string;
  value?: number;
  onChange(value: number): void;
}) {
  const [showTime, toggleTime] = useState<boolean>(false);
  const [time, setTime] = useState<number>(value || new Date().getTime());
  useEffect(() => {
    onChange(time);
  }, [time]);
  return (
    <View style={[styles.container]}>
      <View style={[styles.content]}>
        <Icon source="calendar" size={20} />
        <View>
          {!time && <Text onPress={() => toggleTime(true)}>{label}</Text>}
          {time && (
            <Text onPress={() => toggleTime(true)} style={styles.time}>
              {date.format(new Date(time), "DD/MM/YY")}
            </Text>
          )}
        </View>
      </View>
      {time && (
        <Text onPress={() => toggleTime(true)} style={styles.offset}>
          {label}
        </Text>
      )}
      {showTime && (
        <DateTimePicker
          disabled={disabled}
          value={new Date()}
          mode="date"
          onChange={(data) => {
            toggleTime(false);
            setTime(data.nativeEvent.timestamp);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 62,
    margin: gutter,
    backgroundColor: colors.textInputBG,
    borderRadius: borderRadius,
    borderColor: colors.textInputBorderColor,
    borderWidth: 1,
  },
  offset: {
    ...offset,
  },
  time: {
    fontSize: 18,
    // ...inputContainer,
  },
});
