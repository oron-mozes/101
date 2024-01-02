import _ from "lodash";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { EBreathingTreatment, IAction } from "../../../../../../interfaces";
import { gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { AddAction } from "../section-shared-components/add-a-action";
import { SavedAction } from "../section-shared-components/saved-action";
import { design } from "../shared-style";
import { BActiveBar } from "./b-active-bar";

const initialEmptyAction: IAction<EBreathingTreatment> = {
  action: null,
  time: null,
  successful: null,
  id: null,
};
export function BSection() {
  const translation = useTranslation();

  const breathingCount = usePatientRecordsStore(
    (state) => state.activePatient.breathing.breathingCount
  );

  const saturation = usePatientRecordsStore(
    (state) => state.activePatient.breathing.saturation
  );

  const actions = usePatientRecordsStore(
    (state) => state.activePatient.breathing.actions
  );

  const [action, updateAction] = useState<IAction<EBreathingTreatment>>();

  const handlers = usePatientRecordsStore((state) => state.breathing_handlers);

  useEffect(() => {
    updateAction({
      ...initialEmptyAction,
      time: new Date().getTime(),
      id: new Date().getTime(),
    });
  }, []);
  useEffect(() => {
    if (action && !_.isNull(action?.action) && !_.isNull(action?.time)) {
      saveNewAction();
    }
  }, [action]);

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
        <SectionHeader label={translation("bSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.breathingView]}>
        <BActiveBar />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          testID="breathing-count"
          label={translation("breathings")}
          numeric
          value={breathingCount?.toString()}
          onChange={(breathingCount) => {
            handlers.setBreathingCount(Number(breathingCount));
          }}
        />
        <InputField
          testID="saturation"
          numeric
          value={saturation?.toString()}
          label={translation("saturation")}
          onChange={(saturation) => {
            handlers.setSaturation(Number(saturation));
          }}
        />
      </Card.Content>
      <Card.Content style={{ flexDirection: "column" }}>
        {actions.map((breathingInfo: IAction<EBreathingTreatment>) => (
          <SavedAction
            options={EBreathingTreatment}
            testID="saved-breathing-action-treatment"
            information={breathingInfo}
            key={breathingInfo.id}
            handlers={handlers}
          />
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.actionRow]}>
        {action && (
          <AddAction<EBreathingTreatment>
            information={action}
            update={updateAction}
            testID="new-breathing"
            options={EBreathingTreatment}
            initialEmptyAction={initialEmptyAction}
          />
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
  },
  addItemAction: {
    justifyContent: "flex-start",
    margin: gutter,
  },
  breathingView: {
    width: "50%",
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

export default BSection;
