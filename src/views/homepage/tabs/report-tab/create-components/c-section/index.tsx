import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { BloodPressureInputFieldHandler } from "../../../../../../form-components/blood-pressure-input-field";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { EMeasurementsTreatments, IAction } from "../../../../../../interfaces";
import { gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { AddAction } from "../section-shared-components/add-a-action";
import { AddActionCTA } from "../section-shared-components/add-action-cta";
import { SavedAction } from "../section-shared-components/saved-action";
import { allowToAddAction } from "../section-shared-components/utils";
import { design } from "../shared-style";
import { RadAndShock } from "./rad-and-shock";

const initialEmptyAction: IAction<EMeasurementsTreatments> = {
  action: null,
  time: null,
  successful: null,
  id: null,
};
export function CSection() {
  const translation = useTranslation();

  const puls = usePatientRecordsStore(
    (state) => state.activePatient.measurements.puls
  );
  const bloodPressure = usePatientRecordsStore(
    (state) => state.activePatient.measurements.bloodPressure
  );
  const actions = usePatientRecordsStore(
    (state) => state.activePatient.measurements.actions
  );
  const handlers = usePatientRecordsStore(
    (state) => state.measurements_handlers
  );

  const [action, updateAction] = useState<IAction<EMeasurementsTreatments>>();

  useEffect(() => {
    updateAction({
      ...initialEmptyAction,
      time: new Date().getTime(),
      id: new Date().getTime(),
    });
  }, []);
  const newActionValid = allowToAddAction(actions, action);
  const saveNewAction = () => {
    handlers.addAction({ ...action });
    updateAction({
      ...initialEmptyAction,
      id: new Date().getTime(),
      time: new Date().getTime(),
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("cSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.measurementsView]}>
        <RadAndShock />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        <InputField
          testID="puls"
          value={puls?.toString()}
          numeric
          label={translation("puls")}
          onChange={(puls) => {
            handlers.setPuls(Number(puls));
          }}
        />

        <BloodPressureInputFieldHandler
          value={bloodPressure}
          label={translation("bloodPressure")}
          onChange={(value) => {
            handlers.setBloodPressure(value);
          }}
        />
      </Card.Content>
      <Card.Content style={{ flexDirection: "column" }}>
        {actions.map((measurementInfo: IAction<EMeasurementsTreatments>) => (
          <SavedAction
            options={EMeasurementsTreatments}
            testID="saved-measurement-treatment-action"
            information={measurementInfo}
            key={measurementInfo.id}
            handlers={handlers}
          />
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.actionRow]}>
        {action && (
          <AddAction<EMeasurementsTreatments>
            information={action}
            update={updateAction}
            testID="new-measurement-treatment"
            options={EMeasurementsTreatments}
            initialEmptyAction={initialEmptyAction}
          />
        )}
      </Card.Content>
      <Card.Content
        testID="add-measurement-treatment-action"
        style={[styles.innerContent, styles.addItemAction]}
        aria-disabled={!newActionValid}
      >
        <AddActionCTA
          valid={newActionValid}
          saveNewAction={saveNewAction}
          testID="add-measurement-treatment"
        />
      </Card.Content>
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
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});

export default CSection;
