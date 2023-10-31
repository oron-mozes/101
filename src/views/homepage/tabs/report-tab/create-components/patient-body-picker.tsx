import { useContext, useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-paper";
import { BodyPicker } from "../../../../../components/body-picker";
import { InjuryModal } from "../../../../../components/body-picker/injury-modal";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { mergeData } from "./utils";
import { emptyPatient } from "..";

export function PatientBodyPicker() {
  const translation = useTranslation();
  const [showModal, toggleModal] = useState<boolean>(false);
  const context = useContext(Context);
  const { patient, update } = context;
  const injuries = useMemo(() => patient?.injuries ?? [], [patient?.injuries]);
  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    update({
      injuries: [...injuries, { xPos: locationX, yPos: locationY, data: null }],
    });

    toggleModal(true);
  };

  return (
    <>
      {showModal && (
        <InjuryModal
          closeHandler={() => toggleModal(false)}
          onChange={(data) => {
            let lastHitPoint = injuries.pop();
            lastHitPoint = { ...lastHitPoint, data };
            update({
              injuries: [...injuries, lastHitPoint],
            });
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
