import _ from "lodash";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { EAirWayTreatment, IAction } from "../../../../../../interfaces";
import { gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { AddAction } from "../section-shared-components/add-a-action";
import { SavedAction } from "../section-shared-components/saved-action";
import { design } from "../shared-style";
import { AActiveBar } from "./a-active-bar";

export const initialEmptyAction: IAction<EAirWayTreatment> = {
  action: null,
  time: null,
  id: null,
  successful: null,
};

export function ASection() {
  const translation = useTranslation();

  const actions = usePatientRecordsStore(
    (state) => state.activePatient.airway.actions
  );

  const handlers = usePatientRecordsStore((state) => state.airway_handlers);

  const [action, updateAction] = useState<IAction<EAirWayTreatment>>();
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
        <SectionHeader label={translation("aSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.airwayView]}>
        <AActiveBar />
      </Card.Content>
      <Card.Content style={{ flexDirection: "column" }}>
        {actions.map((airWayInfo: IAction<EAirWayTreatment>) => (
          <SavedAction
            options={EAirWayTreatment}
            testID="saved-airway-action-treatment"
            information={airWayInfo}
            key={airWayInfo.id}
            handlers={handlers}
          />
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.actionRow]}>
        {action && (
          <AddAction<EAirWayTreatment>
            information={action}
            update={updateAction}
            testID="new-airway"
            options={EAirWayTreatment}
            initialEmptyAction={initialEmptyAction}
          />
        )}
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
  airwayView: {
    justifyContent: "flex-start",
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

export default ASection;
