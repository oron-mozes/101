import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Icon, Text } from "react-native-paper";
import { InputField } from "../../../../../../form-components/input-field";
import { CheckButton } from "../../../../../../form-components/select-button";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import {
  IMedicationsAndFluidInformation,
  MEDICATION_TREATMENT,
} from "../../../../../../interfaces";
import { colors, gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import {
  allowAddMedication,
  getMedicationDoseByType,
  getMedicationType,
} from "./utils";

const emptyState: IMedicationsAndFluidInformation = {
  time: null,
  dose: null,
  id: null,
  type: null,
  treatment: null,
  other: null,
};
export function NewMedication() {
  const [newMedication, setNewMedication] =
    useState<IMedicationsAndFluidInformation>({
      ...emptyState,
      id: new Date().getTime(),
      time: new Date().getTime(),
    });
  const handlers = usePatientRecordsStore(
    (state) => state.medicationsAndFluids_handlers
  );
  const translation = useTranslation();

  const selectedTreatmentType = useMemo(
    () => getMedicationType(newMedication),
    [newMedication?.treatment]
  );

  const selectedTreatmentDose = useMemo(
    () => getMedicationDoseByType(newMedication),
    [newMedication?.treatment, newMedication?.type]
  );

  useEffect(() => {
    if (!selectedTreatmentType) {
      setNewMedication({ ...newMedication, type: null });
    }
  }, [selectedTreatmentType]);

  useEffect(() => {
    setNewMedication({ ...newMedication, type: null, dose: null });
  }, [newMedication?.treatment]);

  useEffect(() => {
    const values = Object.values(selectedTreatmentDose ?? {});

    if (values.length === 1) {
      setNewMedication({
        ...newMedication,
        type: newMedication.type,
        dose: values[0],
      });
    }
  }, [selectedTreatmentDose]);

  const valid = allowAddMedication(newMedication);
  return (
    <>
      <Card.Content style={[styles.innerContent, styles.section]}>
        <Text style={styles.title}>{translation("medicationsAndFluid")}</Text>
        <View style={[styles.innerContent]}>
          <View style={[styles.options]}>
            {Object.values(MEDICATION_TREATMENT).map((item) => (
              <CheckButton
                testID={`medication-treatment-${item}`}
                label={translation(item)}
                checked={item === newMedication.treatment}
                onSelect={() => {
                  setNewMedication({
                    ...newMedication,
                    treatment: item,
                  });
                }}
                key={item}
              />
            ))}
          </View>
        </View>
      </Card.Content>

      {newMedication.treatment === MEDICATION_TREATMENT.OTHER && (
        <>
          <Divider style={{ width: "100%", marginTop: 10 }} />
          <View>
            <InputField
              testID="medication-other"
              onChange={(other) => {
                setNewMedication({
                  ...newMedication,
                  other,
                });
              }}
              label={translation("details")}
              value={newMedication.other}
            />
          </View>
        </>
      )}
      {selectedTreatmentType && newMedication.treatment && (
        <>
          <Divider style={{ width: "100%", marginTop: 10 }} />
          <Card.Content style={[styles.innerContent, styles.section]}>
            <Text style={styles.title}>{translation("type")}</Text>
            <View style={[styles.options]}>
              {Object.values(selectedTreatmentType).map((item) => (
                <CheckButton
                  testID={`medication-type-${item}`}
                  key={item}
                  label={translation(item)}
                  checked={item === newMedication.type}
                  onSelect={() => {
                    setNewMedication({
                      ...newMedication,
                      type: item,
                    });
                  }}
                />
              ))}
            </View>
          </Card.Content>
        </>
      )}
      {selectedTreatmentDose && (
        <>
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 10 }} />
          <Card.Content style={[styles.innerContent, styles.section]}>
            <Text style={styles.title}>{translation("dose")}</Text>
            <View style={[styles.options]}>
              {Object.values(selectedTreatmentDose).map((item) => (
                <CheckButton
                  testID={`medication-dose-${item}`}
                  label={translation(item)}
                  checked={item === newMedication?.dose}
                  onSelect={() => {
                    setNewMedication({
                      ...newMedication,
                      dose: item,
                    });
                  }}
                  key={item}
                />
              ))}
            </View>
          </Card.Content>
        </>
      )}
      {newMedication.treatment && (
        <>
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 10 }} />
          <Card.Content style={[styles.innerContent, styles.ctaContainer]}>
            <View style={{ width: "25%" }}>
              <TimePicker
                value={newMedication.time}
                label={translation("actionTime")}
                onChange={(time: number) => {
                  time !== newMedication.time &&
                    setNewMedication({ ...newMedication, time });
                }}
              />
            </View>
          </Card.Content>
        </>
      )}
      <Divider style={{ width: "100%", marginTop: 10 }} />
      <Card.Content
        style={[styles.innerContent, styles.addItemAction]}
        aria-disabled={!valid}
        testID="add-medication-button"
      >
        <Icon
          size={20}
          source="plus"
          color={valid ? colors.primary : colors.disabled}
        />
        <Text
          testID="add-medication-button-handler"
          disabled={!valid}
          style={{
            color: valid ? colors.primary : colors.disabled,
            fontSize: 17,
          }}
          onPress={() => {
            handlers.addAction(newMedication);
            setNewMedication({
              ...emptyState,
              time: new Date().getTime(),
              id: new Date().getTime(),
            });
          }}
        >
          {translation("addMedication")}
        </Text>
      </Card.Content>
    </>
  );
}

const styles = StyleSheet.create({
  ctaContainer: {
    justifyContent: "space-between",
  },
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
    paddingTop: gutter * 2,
    paddingBottom: gutter * 2,
    alignItems: "center",
  },
  measurementsView: {
    justifyContent: "flex-start",
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
  title: {
    textAlign: "left",
  },
  options: {
    flexDirection: "row",
    width: "100%",
  },
  section: { flexDirection: "column" },
  action: {
    flex: 1,
  },
});
