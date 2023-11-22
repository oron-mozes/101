import DateTimePicker from "@react-native-community/datetimepicker";
import date from "date-and-time";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import {
  borderRadius,
  colors,
  gutter,
  inputContainer,
  inputFontSize,
} from "../shared-config";

export function DatePicker({
  label,
  onChange,
  value,
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
  const [time, setTime] = useState<number>(value || new Date().getTime());
  useEffect(() => {
    onChange(time);
  }, [time]);
  return (
    <View style={{ flex: 1, margin: 4 }}>
      <Text
        style={styles.label}
        testID={`${testID ? `${testID}-` : ""}date-label`}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => toggleTime(true)}
        testID={`${testID ? `${testID}-` : ""}date-touch`}
      >
        <View style={[styles.content]}>
          <View>
            {time && (
              <Text
                onPress={() => toggleTime(true)}
                style={styles.time}
                testID={`${testID ? `${testID}-` : ""}date-view`}
              >
                {date.format(new Date(time), "DD/MM/YY")}
              </Text>
            )}
          </View>
          <Icon source="calendar" size={20} />
        </View>

        {showTime && (
          <DateTimePicker
            testID={`${testID ? `${testID}-` : ""}date-picker`}
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
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
  },
  content: {
    ...inputContainer,
  },
  time: {
    fontSize: inputFontSize,
    marginRight: 8,
  },
});
