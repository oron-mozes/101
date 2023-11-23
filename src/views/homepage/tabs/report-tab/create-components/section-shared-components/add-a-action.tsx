import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Icon, Text } from "react-native-paper";

import { DropDown } from "../../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { IAction, TOGGLE } from "../../../../../../interfaces";
import { colors, gutter } from "../../../../../../shared-config";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";

export function AddAction<T>({
  information,
  update,
  initialEmptyAction,
  testID,
  options,
}: {
  options: Record<string, string>;
  testID: string;
  initialEmptyAction: IAction<T>;
  information: IAction<T>;
  update(information: IAction<T>): void;
}) {
  const translation = useTranslation();
  const successful = isSuccessful(information.successful);
  return (
    <>
      <View style={styles.element} testID={testID}>
        <DropDown
          testID={`${testID}-action`}
          label={translation("actionTaken")}
          initialValue={
            information.action && translation(information.action as string)
          }
          onSelect={(value: TAutocompleteDropdownItem) => {
            update({ ...information, action: value.id as T });
          }}
          options={convertToOptions(options, translation)}
        />
      </View>
      <View style={[styles.element, styles.actionRow]}>
        <TimePicker
          value={information.time}
          label={translation("actionTime")}
          onChange={(time: number) => {
            update({ ...information, time });
          }}
        />
        <RadioGroup
          testID={`${testID}-action-successful`}
          label={translation("actionResult")}
          onSelect={(id: string) => {
            update({ ...information, successful: id === TOGGLE.YES });
          }}
          selected={successful}
          options={convertToOptions(TOGGLE, translation)}
        />
        <Text
          testID={`clear-${testID}-action`}
          onPress={() => {
            update({
              ...initialEmptyAction,
              time: new Date().getTime(),
              id: new Date().getTime(),
            });
          }}
          style={styles.deleteAction}
        >
          <Icon size={25} source="delete-outline" color={colors.primary} />
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    justifyContent: "center",
    marginLeft: 5,
    marginTop: 50,
  },
  element: { flex: 1 },
  actionRow: {
    flexDirection: "row",
  },
  addItemAction: {
    justifyContent: "flex-start",
    margin: gutter,
  },
});
