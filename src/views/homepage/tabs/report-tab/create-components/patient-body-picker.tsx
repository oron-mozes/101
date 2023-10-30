import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BodyPicker } from "../../../../../components/body-picker";
import Context from "../context";
import { Card } from "react-native-paper";
import { SectionHeader } from "../../../../../form-components/section-header";
import { design } from "./shared-style";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { InjuryModal } from "../../../../../components/body-picker/injury-modal";
import { useState } from "react";
import {
  EHT_POSITION,
  EPosition,
  IInjuryInformation,
} from "../../../../../interfaces";
import { checkHit } from "./utils";

export function PatientBodyPicker() {
  const translation = useTranslation();
  const [showModal, toggleModal] = useState<boolean>(false);
  const [selectedPosition, setPosition] = useState<EPosition | EHT_POSITION>();

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    const position = checkHit(locationX, locationY);
    if (position) {
      setPosition(position);
      toggleModal(true);
    }
  };
  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const injuries = patient.injuries || {};
        return (
          <>
            {showModal && (
              <InjuryModal
                data={injuries[selectedPosition]}
                closeHandler={() => toggleModal(false)}
                onChange={(positionData: {
                  data: IInjuryInformation;
                  position: EPosition;
                }) => {
                  update({
                    injuries: {
                      ...injuries,
                      [positionData.position]: {
                        ...(injuries[positionData.position] ?? {}),
                        ...positionData.data,
                      },
                    },
                  });
                }}
                position={selectedPosition}
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
      }}
    </Context.Consumer>
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
