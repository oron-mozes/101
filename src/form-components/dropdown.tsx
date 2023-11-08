import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "../hooks/useMyTranslation";
import { IOption } from "../interfaces";
import { borderSetup, gutter, inputHeight, offset } from "../shared-config";

export function DropDown({
  label,
  options,
  initialValue,
  onSelect,
  editable,
}: {
  editable: boolean;
  label: string;
  initialValue?: string;
  onSelect(value: IOption): void;
  options: IOption[];
}) {
  const translation = useTranslation();
  const selected = initialValue || 0;
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        enabled={!editable}
        style={styles.picker}
        mode="dialog"
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) {
            onSelect(options[itemIndex - 1]);
          }
        }}
      >
        <Picker.Item label={translation("select")} value={0} />
        {options.map((option) => (
          <Picker.Item label={option.title} value={option.id} key={option.id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    marginTop: -11,
  },
  field: {
    ...borderSetup,
    height: inputHeight,
    margin: gutter,
    flex: 1,
  },
  label: {
    ...offset,
    fontSize: 12,
    marginTop: -3,
  },
});
