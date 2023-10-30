import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
  value,
}: {
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
        <Icon source="clock-outline" size={20} />
        <View>
          {!time && <Text onPress={() => toggleTime(true)}>{label}</Text>}
          {time && (
            <Text onPress={() => toggleTime(true)} style={styles.time}>
              {date.format(new Date(time), "HH:mm")}
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
          value={new Date()}
          mode="time"
          is24Hour={true}
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
