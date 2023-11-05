import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-paper";
import { BodyPicker } from "../../../../../components/body-picker";
import { InjuryModal } from "../../../../../components/body-picker/injury-modal";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";

export function PatientBodyPicker() {
  const translation = useTranslation();
  const injuries = usePatientRecordsStore((state) => {
    return state.activePatient.injuries ?? [];
  });

  // const handlers = usePatientRecordsStore((state) => state.injuries_handlers);
  const [showModal, toggleModal] = useState<boolean>(false);

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    // handlers.addInjury({
    //   xPos: locationX,
    //   yPos: locationY,
    //   data: null,
    // });

    toggleModal(true);
  };

  return (
    <>
      {showModal && (
        <InjuryModal
          closeHandler={() => toggleModal(false)}
          onChange={(data) => {
            // handlers.updateAtIndex(data, injuries.length - 1);
          }}
        />
      )}
      <TouchableWithoutFeedback onPress={handlePress}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <SectionHeader label={translation("bodyPicker")} />
          </Card.Content>
          <Card.Content style={[styles.innerContent]}>
            <BodyPicker injuries={injuries} />
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 10,
  },
});
