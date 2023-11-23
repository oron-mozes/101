import _ from "lodash";
import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import {
  EBreathingTreatment,
  IBreathingInformation,
  TOGGLE,
} from "../../../../../../interfaces";
import { colors } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";

export function SavedAAction({
  breathingInfo,
}: {
  breathingInfo: IBreathingInformation;
}) {
  const translation = useTranslation();
  const handlers = usePatientRecordsStore((state) => state.breathing_handlers);
  const successful = isSuccessful(breathingInfo.successful);
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.element}>
        <DropDown
          testID="saved-airway-action-treatment"
          label={translation("actionTaken")}
          initialValue={translation(breathingInfo.action)}
          onSelect={(value: TAutocompleteDropdownItem) => {
            if (_.isEqual(breathingInfo.action, value.id)) return;
            value &&
              handlers.updateById(
                {
                  action: value.id as EBreathingTreatment,
                },
                breathingInfo.id
              );
          }}
          options={convertToOptions(EBreathingTreatment, translation)}
        />
      </View>
      <View style={[styles.element, styles.actionRow]}>
        <TimePicker
          value={breathingInfo.time}
          label={translation("actionTime")}
          onChange={(time: number) => {
            if (_.isEqual(breathingInfo.time, time)) return;
            handlers.updateById({ time }, breathingInfo.id);
          }}
        />
        <RadioGroup
          label={translation("actionResult")}
          onSelect={(id: string) => {
            handlers.updateById(
              { successful: id === TOGGLE.YES },
              breathingInfo.id
            );
          }}
          selected={successful}
          options={convertToOptions(TOGGLE, translation)}
        />
        <Text
          onPress={() => {
            handlers.removeAction(breathingInfo.id);
          }}
          style={styles.deleteAction}
        >
          <Icon size={25} source="delete-outline" color={colors.primary} />
        </Text>
      </View>
    </View>
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
});
