import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import {
  EAirWayTreatment,
  IAirWayInformation,
  TOGGLE,
} from "../../../../../../interfaces";
import { colors } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";
import _ from "lodash";

export function SavedAAction({
  airWayInfo,
}: {
  airWayInfo: IAirWayInformation;
}) {
  const translation = useTranslation();
  const handlers = usePatientRecordsStore((state) => state.airway_handlers);
  const successful = isSuccessful(airWayInfo.successful);
  console.log("airWayInfo", airWayInfo);
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.element}>
        <DropDown
          testID="saved-airway-action-treatment"
          label={translation("actionTaken")}
          initialValue={translation(airWayInfo.action)}
          onSelect={(value: TAutocompleteDropdownItem) => {
            if (_.isEqual(airWayInfo.action, value.id)) return;
            value &&
              handlers.updateById(
                {
                  action: value.id as EAirWayTreatment,
                },
                airWayInfo.id
              );
          }}
          options={convertToOptions(EAirWayTreatment, translation)}
        />
      </View>
      <View style={[styles.element, styles.actionRow]}>
        <TimePicker
          value={airWayInfo.time}
          label={translation("actionTime")}
          onChange={(time: number) => {
            if (_.isEqual(airWayInfo.time, time)) return;
            handlers.updateById({ time }, airWayInfo.id);
          }}
        />
        <RadioGroup
          label={translation("actionResult")}
          onSelect={(id: string) => {
            handlers.updateById(
              { successful: id === TOGGLE.YES },
              airWayInfo.id
            );
          }}
          selected={successful}
          options={convertToOptions(TOGGLE, translation)}
        />
        <Text
          onPress={() => {
            handlers.removeAction(airWayInfo.id);
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
