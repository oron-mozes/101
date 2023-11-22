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
  inputContainer,
} from "../shared-config";
// import { Appearance, useColorScheme } from "react-native-appearance";
import { useColorScheme } from "react-native";

export function TimePicker({
  label,
  onChange,
  value = new Date().getTime(),
  editable = true,
  testID,
}: {
  editable?: boolean;
  label: string;
  testID?: string;
  value?: number;
  onChange(value: number): void;
}) {
  const [showTime, toggleTime] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    onChange(value);
  }, []);

  return (
    <View style={{ flex: 1, margin: 4 }}>
      <Text
        style={styles.label}
        testID={`${testID ? `${testID}-` : ""}picker-label`}
      >
        {label}
      </Text>
      <TouchableOpacity onPress={() => editable && toggleTime(true)}>
        <View style={[styles.content]}>
          <View>
            {!value && (
              <Text
                onPress={() => editable && toggleTime(true)}
                testID={`${testID ? `${testID}-` : ""}picker-toggle`}
              >
                {label}
              </Text>
            )}
            {value && (
              <Text
                testID={`${testID ? `${testID}-` : ""}picker-view`}
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

        {showTime && (
          <DateTimePicker
            testID={`${testID ? `${testID}-` : ""}picker`}
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
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    ...inputContainer,
    justifyContent: "space-around",
  },
  label: {
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
  },
});
