import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { StatusChip } from "../../../../../../form-components/status-chip";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { STATUS } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { EvacBy } from "./evac-by";
import { EvacInformation } from "./information";

export function Evacuation() {
  const translation = useTranslation();
  const evacuation = usePatientRecordsStore(
    (state) => state.activePatient.evacuation
  );
  const handlers = usePatientRecordsStore((state) => state.evacuation_handlers);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("evacuate")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <EvacInformation />
      </Card.Content>

      <Card.Content style={styles.innerContent}>
        <EvacBy />
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(STATUS)
          .filter(
            (status) => ![STATUS.NEW_PATIENT, STATUS.CLOSED].includes(status)
          )
          .map((item) => (
            <StatusChip
              testID={`status-${item}`}
              key={item}
              label={translation(item)}
              status={item}
              allowSelect
              selected={evacuation.status === item}
              onSelect={() => {
                handlers.setStatus(item);
              }}
            />
          ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: design.card,
  content: design.content,
  innerContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default Evacuation;
