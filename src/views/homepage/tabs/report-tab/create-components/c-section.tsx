import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { emptyPatient } from "..";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
import { RadioGroup } from "../../../../../form-components/radio-group";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  IMeasurementsInformation,
  EMeasurementsTreatments,
  TOGGLE,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import Context from "../context";
import { design } from "./shared-style";
import {
  convertStringToNumber,
  convertToOptions,
  mergeData,
  removeByIndexHandler,
  updateDataInIndex,
  validateLastItem,
} from "./utils";
import { useContext, useMemo } from "react";

const emptyState: IMeasurementsInformation = {
  action: null,
  time: null,
  successful: null,
};
export function CSection() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update } = context;
  const measurements = useMemo(
    () => mergeData(patient?.measurements, emptyPatient.measurements),
    [patient?.measurements]
  );

  const { actions, fulfill } = measurements;

  const addRow = () => {
    update({
      measurements: {
        ...measurements,
        actions: [...actions, emptyState],
      },
    });
  };

  if (fulfill && !Boolean(actions?.length)) {
    addRow();
  }

  const updateInIndex = (
    data: Partial<IMeasurementsInformation>,
    index: number
  ) =>
    update({
      measurements: {
        ...measurements,
        actions: updateDataInIndex(
          actions,
          data as IMeasurementsInformation,
          index
        ),
      },
    });

  const removeByIndex = (index: number) => {
    const newData = removeByIndexHandler(actions, index);

    update({
      measurements: {
        ...measurements,
        actions: newData,
        fulfill: newData.length !== 0,
      },
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("cSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.measurementsView]}>
        <RadioGroup
          horizontal
          label={translation("shock")}
          onSelect={(id: string) => {
            update({
              measurements: {
                ...measurements,
                shock: id === TOGGLE.YES,
              },
            });
          }}
          selected={
            measurements.shock !== null
              ? measurements.shock
                ? TOGGLE.YES
                : TOGGLE.NO
              : null
          }
          options={convertToOptions(TOGGLE, translation)}
        />
        <RadioGroup
          horizontal
          label={translation("palpated")}
          onSelect={(id: string) => {
            update({
              measurements: {
                ...measurements,
                palpated: id === TOGGLE.YES,
              },
            });
          }}
          selected={
            measurements.palpated !== null
              ? measurements.palpated
                ? TOGGLE.YES
                : TOGGLE.NO
              : null
          }
          options={convertToOptions(TOGGLE, translation)}
        />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        <InputField
          value={measurements.puls?.toString()}
          numeric
          label={translation("puls")}
          onChange={(puls) => {
            update({
              measurements: {
                ...measurements,
                puls: convertStringToNumber(puls),
              },
            });
          }}
        />
        {/* <View style={{ flex: 1, flexDirection: "row-reverse" }}> */}
        <InputField
          numeric
          value={measurements.bloodPressure.diastolic?.toString()}
          label={translation("bloodPressureDiastolic")}
          onChange={(diastolic) => {
            update({
              measurements: {
                ...measurements,
                bloodPressure: {
                  ...measurements.bloodPressure,
                  diastolic: convertStringToNumber(diastolic),
                },
              },
            });
          }}
        />
        <InputField
          value={measurements.bloodPressure.systolic?.toString()}
          label={translation("bloodPressureSystolic")}
          numeric
          onChange={(systolic) => {
            update({
              measurements: {
                ...measurements,
                bloodPressure: {
                  ...measurements.bloodPressure,
                  systolic: convertStringToNumber(systolic),
                },
              },
            });
          }}
        />
        {/* </View> */}
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
                onPress={() => removeByIndex(index)}
                style={styles.deleteAction}
              >
                <Icon size={20} source="delete" color={colors.primary} />
              </Text>

              <RadioGroup
                label={translation("actionResult")}
                onSelect={(id: string) => {
                  updateInIndex({ successful: id === TOGGLE.YES }, index);
                }}
                selected={isSuccessful}
                options={convertToOptions(TOGGLE, translation)}
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
