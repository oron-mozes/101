import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { emptyPatient } from "..";
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
import Context from "../context";
import { design } from "./shared-style";
import {
  convertStringToNumber,
  convertToOptions,
  getDoseByValue,
  mergeData,
  removeByIndexHandler,
  updateDataInIndex,
  validateLastItem,
} from "./utils";
import { useContext, useMemo } from "react";

const emptyState: IMedicationsAndFluidInformation = {
  action: null,
  time: null,
  dose: null,
};
export function MedicationsAndFluidSection() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update } = context;
  const medicationsAndFluids = useMemo(
    () =>
      mergeData(
        patient?.medicationsAndFluids,
        emptyPatient.medicationsAndFluids
      ),
    [patient?.medicationsAndFluids]
  );

  const { actions = [] } = medicationsAndFluids;
  const addRow = () => {
    update({
      medicationsAndFluids: {
        actions: [...actions, emptyState],
      },
    });
  };

  const updateInIndex = (
    data: Partial<IMedicationsAndFluidInformation>,
    index: number
  ) =>
    update({
      medicationsAndFluids: {
        actions: updateDataInIndex(
          actions,
          data as IMedicationsAndFluidInformation,
          index
        ),
      },
    });

  const removeByIndex = (index: number) => {
    update({
      medicationsAndFluids: {
        actions: removeByIndexHandler(actions, index),
      },
    });
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
                onPress={() => removeByIndex(index)}
                style={styles.deleteAction}
              >
                <Icon size={20} source="delete" color={colors.primary} />
              </Text>
              <InputField
                disabled={false}
                label={translation("dose")}
                numeric
                value={measurements.dose?.toString()}
                onChange={(dose) => {
                  updateInIndex({ dose: convertStringToNumber(dose) }, index);
                }}
              />
              <TimePicker
                value={measurements.time}
                label={translation("actionTime")}
                onChange={(time: number) => {
                  updateInIndex({ time }, index);
                }}
              />
            </View>
            <View style={styles.element}>
              <DropDown
                label={translation("actionTaken")}
                placeholder={translation("select")}
                initialValue={measurements.action}
                onSelect={(value: TAutocompleteDropdownItem) => {
                  value &&
                    updateInIndex(
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
