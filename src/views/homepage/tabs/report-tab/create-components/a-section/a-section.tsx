import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Icon, Text } from "react-native-paper";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { IAirWayInformation } from "../../../../../../interfaces";
import { colors, gutter, inputFontSize } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { AActiveBar } from "./a-active-bar";
import { AddAAction } from "./add-a-action";
import { SavedAAction } from "./saved-a-action";

export const initialEmptyAction = {
  action: null,
  time: new Date().getTime(),
  id: new Date().getTime(),
  successful: null,
};

export function ASection() {
  const translation = useTranslation();

  const actions = usePatientRecordsStore(
    (state) => state.activePatient.airway.actions ?? []
  );
  const addAction = usePatientRecordsStore(
    (state) => state.airway_handlers.addAction
  );

  const [action, updateAction] = useState<IAirWayInformation>();
  useEffect(() => {
    !Boolean(actions.length) && updateAction({ ...initialEmptyAction });
  }, [actions]);

  const newActionValid =
    (Boolean(action?.action) && Boolean(action?.time)) === true;

  const saveNewAction = () => {
    addAction(action);
    updateAction(null);
  };
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("aSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.airwayView]}>
        <AActiveBar />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.actionRow]}>
        {actions.map((airWayInfo: IAirWayInformation) => (
          <SavedAAction airWayInfo={airWayInfo} key={airWayInfo.id} />
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.actionRow]}>
        {action && <AddAAction airWayInfo={action} update={updateAction} />}
      </Card.Content>

      <Card.Content
        testID="add-airway-action"
        style={[styles.innerContent, styles.addItemAction]}
        aria-disabled={newActionValid}
      >
        <Icon
          size={20}
          source="plus"
          color={newActionValid ? colors.primary : colors.disabled}
        />
        <Text
          style={{
            color: newActionValid ? colors.primary : colors.disabled,
            fontSize: inputFontSize,
          }}
          onPress={() => {
            newActionValid && saveNewAction();
          }}
        >
          {translation("addAction")}
        </Text>
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
