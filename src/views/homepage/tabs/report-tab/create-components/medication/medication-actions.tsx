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
      {actions.map((action, index) => (
        <View key={`${action.time}|${index}`}>
          <Card.Content style={[styles.innerContent, styles.section]}>
            <Text style={styles.title}>{translation("takenMedication")}</Text>
            <View style={[styles.innerContent]}>
              <View style={[styles.innerContent, styles.action]}>
                <CheckButton
                  editable={false}
                  label={translation(action.treatment)}
                  checked={false}
                  onSelect={() => {}}
                />
                {action.type && (
                  <CheckButton
                    editable={false}
                    label={translation(action.type)}
                    checked={false}
                    onSelect={() => {}}
                  />
                )}
                <CheckButton
                  editable={false}
                  label={translation(action.dose ?? "")}
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
                    editable={false}
                    value={action.time}
                    label={translation("actionTime")}
                    onChange={(time) => {
                      handlers.updateAtIndex({ time }, index);
                    }}
                  />
                </View>
                <Text
                  onPress={() => {
                    handlers.removeAction(index);
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
