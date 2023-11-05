import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
import { RadioGroup } from "../../../../../form-components/radio-group";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  EMeasurementsTreatments,
  IMeasurementsInformation,
  TOGGLE,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import { convertToOptions, validateLastItem } from "./utils";

const emptyState: IMeasurementsInformation = {
  action: null,
  time: null,
  successful: null,
};
export function CSection() {
  const translation = useTranslation();

  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );
  const { actions, fulfill, shock, palpated, puls, bloodPressure } =
    usePatientRecordsStore((state) => state.activePatient.measurements);
  const handlers = usePatientRecordsStore(
    (state) => state.measurements_handlers
  );

  const addRow = () => {
    handlers.addAction(emptyState);
  };

  if (fulfill && !Boolean(actions?.length)) {
    addRow();
  }

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("cSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.measurementsView]}>
        <RadioGroup
          disabled={disabled}
          horizontal
          label={translation("shock")}
          onSelect={(id: string) => {
            handlers.toggleShock(id === TOGGLE.YES);
          }}
          selected={shock !== null ? (shock ? TOGGLE.YES : TOGGLE.NO) : null}
          options={convertToOptions(TOGGLE, translation)}
        />
        <RadioGroup
          disabled={disabled}
          horizontal
          label={translation("palpated")}
          onSelect={(id: string) => {
            handlers.togglePalpated(id === TOGGLE.YES);
          }}
          selected={
            palpated !== null ? (palpated ? TOGGLE.YES : TOGGLE.NO) : null
          }
          options={convertToOptions(TOGGLE, translation)}
        />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        <InputField
          disabled={disabled}
          value={puls?.toString()}
          numeric
          label={translation("puls")}
          onChange={(puls) => {
            handlers.setPuls(Number(puls));
          }}
        />

        <InputField
          disabled={disabled}
          numeric
          value={bloodPressure.diastolic?.toString()}
          label={translation("bloodPressureDiastolic")}
          onChange={(diastolic) => {
            handlers.setDiastolic(Number(diastolic));
          }}
        />
        <InputField
          disabled={disabled}
          value={bloodPressure.systolic?.toString()}
          label={translation("bloodPressureSystolic")}
          numeric
          onChange={(systolic) => {
            handlers.setSystolic(Number(systolic));
          }}
        />
      </Card.Content>

      {actions?.map((measurements: IMeasurementsInformation, index) => {
        const isSuccessful =
          measurements.successful === null
            ? null
            : measurements.successful
            ? TOGGLE.YES
            : TOGGLE.NO;

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

              <RadioGroup
                disabled={disabled}
                label={translation("actionResult")}
                onSelect={(id: string) => {
                  handlers.updateAtIndex(
                    { successful: id === TOGGLE.YES },
                    index
                  );
                }}
                selected={isSuccessful}
                options={convertToOptions(TOGGLE, translation)}
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
                label={translation("actionTaken")}
                disabled={disabled}
                initialValue={measurements.action}
                onSelect={(value: TAutocompleteDropdownItem) => {
                  value &&
                    handlers.updateAtIndex(
                      {
                        action: value.id as EMeasurementsTreatments,
                      },
                      index
                    );
                }}
                options={convertToOptions(EMeasurementsTreatments, translation)}
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
            {translation("addAction")}
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
