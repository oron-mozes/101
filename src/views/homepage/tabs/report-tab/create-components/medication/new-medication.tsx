import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import { InputField } from "../../../../../../form-components/input-field";
import { CheckButton } from "../../../../../../form-components/select-button";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import {
  E_FLUID_TREATMENT,
  IMedicationsAndFluidInformation,
  MEDICATION_TREATMENT,
} from "../../../../../../interfaces";
import { gutter, inputFontSize } from "../../../../../../shared-config";
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
      time: null,
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
        dose: null,
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
      {newMedication.type === E_FLUID_TREATMENT.BLOOD && (
        <>
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 10 }} />
          <Card.Content style={[styles.innerContent, styles.section]}>
            <InputField
              numeric
              onChange={(value) => {
                setNewMedication({
                  ...newMedication,
                  other: value,
                });
              }}
              label={translation("bloodBagId")}
              value={newMedication.other}
            />
          </Card.Content>
        </>
      )}

      {selectedTreatmentDose && (
        <>
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 10 }} />
          <Card.Content style={[styles.innerContent, styles.section]}>
            <Text style={styles.title}>{translation("dose")}</Text>
            <View style={[styles.options, { alignItems: "center" }]}>
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
              <View style={{ width: 80, marginTop: -30 }}>
                <InputField
                  onChange={(value) => {
                    setNewMedication({
                      ...newMedication,
                      other: value,
                    });
                  }}
                  label={translation("other")}
                  value={newMedication.other}
                />
              </View>
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
                value={newMedication.time || new Date().getTime()}
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
        <Button
          mode={valid ? "contained" : "outlined"}
          testID="add-medication-button-handler"
          labelStyle={{ fontSize: inputFontSize }}
          icon="plus"
          onPress={() => {
            handlers.addAction(newMedication);
            setNewMedication({
              ...emptyState,
              time: new Date().getTime(),
              id: new Date().getTime(),
            });
          }}
          disabled={!valid}
        >
          {translation("save")}
        </Button>
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
