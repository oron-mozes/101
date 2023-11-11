import DateTimePicker from "@react-native-community/datetimepicker";
import date from "date-and-time";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { borderRadius, colors, gutter, offset } from "../shared-config";

export function DatePicker({
  label,
  onChange,
  value,
  editable,
}: {
  editable: boolean;
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
    <TouchableOpacity
      onPress={() => toggleTime(true)}
      style={[styles.container]}
    >
      <View style={[styles.content]}>
        <View>
          {!time && <Text onPress={() => toggleTime(true)}>{label}</Text>}
          {time && (
            <Text onPress={() => toggleTime(true)} style={styles.time}>
              {date.format(new Date(time), "DD/MM/YY")}
            </Text>
          )}
        </View>
        <Icon source="calendar" size={20} />
      </View>
      {time && (
        <Text onPress={() => toggleTime(true)} style={styles.offset}>
          {label}
        </Text>
      )}
      {showTime && (
        <DateTimePicker
          disabled={!editable}
          value={new Date()}
          mode="date"
          onChange={(data) => {
            toggleTime(false);
            setTime(data.nativeEvent.timestamp);
          }}
        />
      )}
    </TouchableOpacity>
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
