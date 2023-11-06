import { StyleSheet, View } from "react-native";
import { Card, Icon, Divider, Text } from "react-native-paper";
import { CheckButton } from "../../../../../../form-components/select-button";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { colors } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";

export function MedicationActions() {
  const actions = usePatientRecordsStore(
    (state) => state.activePatient.medicationsAndFluids.actions
  );
  const handlers = usePatientRecordsStore(
    (state) => state.medicationsAndFluids_handlers
  );
  const translation = useTranslation();

  return (
    <>
      {actions.map((action) => (
        <View key={action.id}>
          <Card.Content style={[styles.innerContent, styles.section]}>
            <Text style={styles.title}>{translation("takenMedication")}</Text>
            <View style={[styles.innerContent]}>
              <View style={[styles.innerContent, styles.action]}>
                <CheckButton
                  disabled={true}
                  label={translation(action.treatment)}
                  checked={false}
                  onSelect={() => {}}
                />
                {action.type && (
                  <CheckButton
                    disabled={true}
                    label={translation(action.type)}
                    checked={false}
                    onSelect={() => {}}
                  />
                )}
                <CheckButton
                  disabled={true}
                  label={translation(action.dose)}
                  checked={false}
                  onSelect={() => {}}
                />
              </View>
              <View
                style={[
                  styles.innerContent,
                  styles.action,
                  { justifyContent: "flex-end" },
                ]}
              >
                <View style={{ width: 120 }}>
                  <TimePicker
                    disabled={true}
                    value={action.time}
                    label={translation("actionTime")}
                    onChange={() => {}}
                  />
                </View>
                <Text
                  onPress={() => {
                    handlers.removeAction(action.id);
                  }}
                  style={styles.deleteAction}
                >
                  <Icon
                    size={20}
                    source="delete-outline"
                    color={colors.primary}
                  />
                </Text>
              </View>
            </View>
          </Card.Content>
          <Divider style={{ width: "100%", marginTop: 10 }} />
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    justifyContent: "center",
    marginRight: 3,
    marginTop: 32,
  },

  innerContent: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
  title: {
    textAlign: "right",
  },
  options: {
    flexDirection: "row-reverse",
  },
  section: { flexDirection: "column" },
  action: {
    flex: 1,
  },
});
