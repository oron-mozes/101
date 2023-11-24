import date from "date-and-time";
import { StyleSheet, View } from "react-native";
import { Card, Divider, IconButton, Text } from "react-native-paper";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { colors } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";

export function MedicationActions() {
  const translation = useTranslation();
  const actions = usePatientRecordsStore((state) => [
    ...state.activePatient.medicationsAndFluids.actions,
  ]);

  const handlers = usePatientRecordsStore(
    (state) => state.medicationsAndFluids_handlers
  );

  return (
    <View>
      <Card.Content style={[styles.innerContent, styles.section]}>
        {actions.length !== 0 && (
          <Text style={styles.title}>{translation("takenMedication")}</Text>
        )}
        {actions.map((action, index) => {
          return (
            <View
              testID={`medication-action-${index}`}
              key={`${action.time}|${index}`}
              style={[
                styles.innerContent,
                {
                  flexDirection: "row",

                  alignItems: "center",
                },
              ]}
            >
              <Text
                variant="bodyLarge"
                style={{ flex: 1 }}
                testID={`medication-action-${index}-message`}
              >
                {[
                  translation(action.treatment),
                  translation(action.type ?? ""),
                  translation(action.dose ?? ""),
                  action.other ?? "",
                  date.format(new Date(action.time), "HH:mm"),
                ]
                  .filter((a) => a)
                  .join(", ")}
              </Text>
              <IconButton
                icon="delete-outline"
                iconColor={colors.primary}
                size={25}
                onPress={() => {
                  handlers.removeAction(index);
                }}
              />
            </View>
          );
        })}
      </Card.Content>
      {actions.length !== 0 && (
        <Divider style={{ width: "100%", marginTop: 10 }} />
      )}
    </View>
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
