import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  EMedications,
  IMedicationsAndFluidInformation,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import {
  convertStringToNumber,
  convertToOptions,
  getDoseByValue,
  validateLastItem,
} from "./utils";

const emptyState: IMedicationsAndFluidInformation = {
  action: null,
  time: null,
  dose: null,
  id: null,
};
export function MedicationsAndFluidSection() {
  const translation = useTranslation();
  const medicationsAndFluids = usePatientRecordsStore(
    (state) => state.activePatient.medicationsAndFluids
  );
  const handlers = usePatientRecordsStore(
    (state) => state.medicationsAndFluids_handlers
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );

  const { actions = [] } = medicationsAndFluids;
  const addRow = () => {
    handlers.addAction(emptyState);
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("medicationsAndFluid")} />
      </Card.Content>

      {actions?.map((measurements: IMedicationsAndFluidInformation, index) => {
        return (
          <Card.Content
            style={[styles.innerContent, styles.actionRow]}
            key={measurements.action}
          >
            <View style={[styles.element, styles.actionRow]}>
              <Text
                disabled={disabled}
                onPress={() => handlers.removeAction(index)}
                style={styles.deleteAction}
              >
                <Icon size={20} source="delete" color={colors.primary} />
              </Text>
              <InputField
                disabled={disabled}
                label={translation("dose")}
                numeric
                value={measurements.dose?.toString()}
                onChange={(dose) => {
                  handlers.updateAtIndex(
                    { dose: convertStringToNumber(dose) },
                    index
                  );
                }}
              />
              <TimePicker
                disabled={disabled}
                value={measurements.time}
                label={translation("actionTime")}
                onChange={(time: number) => {
                  handlers.updateAtIndex({ time }, index);
                }}
              />
            </View>
            <View style={styles.element}>
              <DropDown
                disabled={disabled}
                label={translation("actionTaken")}
                initialValue={measurements.action}
                onSelect={(value: TAutocompleteDropdownItem) => {
                  value &&
                    handlers.updateAtIndex(
                      {
                        action: value.id as EMedications,
                        dose: getDoseByValue(value.id),
                      },
                      index
                    );
                }}
                options={convertToOptions(EMedications, translation)}
              />
            </View>
          </Card.Content>
        );
      })}
      {validateLastItem(actions) && (
        <Card.Content style={[styles.innerContent, styles.addItemAction]}>
          <Icon size={20} source="plus" color={colors.primary} />
          <Text
            disabled={disabled}
            style={{ color: colors.primary, fontSize: 17 }}
            onPress={addRow}
          >
            {translation("addMedication")}
          </Text>
        </Card.Content>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    justifyContent: "center",
    marginRight: 3,
    marginTop: 32,
  },
  element: { flex: 1 },
  actionRow: {
    flexDirection: "row",
  },
  addItemAction: {
    justifyContent: "flex-start",
    margin: gutter,
  },
  measurementsView: {
    justifyContent: "flex-start",
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
