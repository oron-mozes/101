import { useState, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Divider, Icon, Text } from "react-native-paper";
import { CheckButton } from "../../../../../../form-components/select-button";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import {
  IMedicationsAndFluidInformation,
  MEDICATION_TREATMENT,
} from "../../../../../../interfaces";
import { colors, gutter } from "../../../../../../shared-config";
import { design } from "../shared-style";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { getMedicationDoseByType, getMedicationType } from "./utils";

const emptyState: IMedicationsAndFluidInformation = {
  action: null,
  time: null,
  dose: null,
  id: null,
  type: null,
  treatment: null,
};
export function NewMedication({ onClose }: { onClose(): void }) {
  const actions = usePatientRecordsStore(
    (state) => state.activePatient.medicationsAndFluids.actions
  );

  const [newMedication, setNewMedication] =
    useState<IMedicationsAndFluidInformation>();
  const handlers = usePatientRecordsStore(
    (state) => state.medicationsAndFluids_handlers
  );
  const translation = useTranslation();
  const [selectedStyle, setSelectedStyle] = useState<object>({});
  useEffect(() => {
    actions.length === 0
      ? setNewMedication({
          ...emptyState,
          time: new Date().getTime(),
          id: new Date().getTime(),
        })
      : setNewMedication(null);
  }, [actions]);

  const selectedTreatmentType = useMemo(
    () => getMedicationType(newMedication),
    [newMedication?.treatment]
  );

  const selectedTreatmentDose = useMemo(
    () => getMedicationDoseByType(newMedication),
    [newMedication?.treatment, newMedication?.type]
  );

  const addRow = () => {
    handlers.addAction(newMedication);
    setNewMedication(null);
    onClose();
  };

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

  return (
    <>
      {newMedication && (
        <>
          <Card.Content style={[styles.innerContent, styles.section]}>
            <Text style={styles.title}>
              {translation("medicationsAndFluid")}
            </Text>
            <View style={[styles.innerContent]}>
              <View style={[styles.options]}>
                {Object.values(MEDICATION_TREATMENT).map((item) => (
                  <CheckButton
                    label={translation(item)}
                    checked={item === newMedication.treatment}
                    onSelect={() => {
                      setSelectedStyle(styles[MEDICATION_TREATMENT[item]]);
                      setNewMedication({
                        ...newMedication,
                        treatment: item,
                      });
                    }}
                    key={item}
                  />
                ))}
              </View>
              <TimePicker
                value={newMedication.time}
                label={translation("actionTime")}
                onChange={(time: number) => {
                  setNewMedication({ ...newMedication, time });
                }}
              />
            </View>
          </Card.Content>

          {selectedTreatmentType && newMedication.treatment && (
            <>
              <Divider style={{ width: "100%", marginTop: 10 }} />
              <Card.Content style={[styles.innerContent, styles.section]}>
                <Text style={styles.title}>{translation("type")}</Text>
                <View style={[styles.options]}>
                  {Object.values(selectedTreatmentType).map((item) => (
                    <CheckButton
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
              <Divider
                style={{ width: "100%", marginTop: 10, marginBottom: 10 }}
              />
              <Card.Content style={[styles.innerContent, styles.section]}>
                <Text style={styles.title}>{translation("dose")}</Text>
                <View style={[styles.options]}>
                  {Object.values(selectedTreatmentDose).map((item) => (
                    <CheckButton
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
          <Card.Content style={[styles.innerContent, styles.ctaContainer]}>
            <Button
              onPress={addRow}
              mode="contained"
              icon="check"
              disabled={
                !(
                  Boolean(newMedication?.dose) &&
                  Boolean(newMedication?.treatment)
                )
              }
            >
              {translation("saveAndContinue")}
            </Button>
          </Card.Content>
        </>
      )}
      {!newMedication && (
        <Card.Content style={[styles.innerContent, styles.addItemAction]}>
          <Icon size={20} source="plus" color={colors.primary} />
          <Text
            style={{ color: colors.primary, fontSize: 17 }}
            onPress={() => {
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  [MEDICATION_TREATMENT.ANASTASIA]: {
    backgroundColor: "#746D75",
  },
  [MEDICATION_TREATMENT.ANTIBIOTIC]: {
    backgroundColor: "#8C4843",
  },
  [MEDICATION_TREATMENT.FLUIDS]: {
    backgroundColor: "#820B8A",
  },
  [MEDICATION_TREATMENT.HEXAKAPRON]: {
    backgroundColor: "#19535F",
  },
  ctaContainer: {
    justifyContent: "flex-end",
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
  },
  section: { flexDirection: "column" },
  action: {
    flex: 1,
  },
});
