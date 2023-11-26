import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { BodyPicker } from "../../../../../../components/body-picker";
import { InjuryModal } from "../../../../../../components/body-picker/injury-modal/injury-modal";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { TouniquetLegend } from "./touniquet-legend";
import { GunLegend } from "./gun-legend";
import { HitLegend } from "./hit-legend";
import { CutLegend } from "./cut-legend";
import { BurnLegend } from "./burns-legend";
import { getLocationByPoint, hasBeenClicked } from "./utils";
import { ConfirmModal } from "../../../../../../components/confirm-modal";
import { CGLegend } from "./cg-legend";
import { KateterLegend } from "./kateter-legend";
import { borderSetup } from "../../../../../../shared-config";
import { DropDown } from "../../../../../../form-components/dropdown";
import { E_InjuryType } from "../../../../../../interfaces";

export function PatientBodyPicker() {
  const translation = useTranslation();
  const injuries = usePatientRecordsStore((state) => {
    return [...state.activePatient.injuries];
  });

  const handlers = usePatientRecordsStore((state) => state.injuries_handlers);
  const [showModal, toggleModal] = useState<boolean>(false);
  const [readyForDelete, setToDelete] = useState<number>();

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = { xPos: locationX, yPos: locationY };

    const clickedOnInjury = injuries.find((injury) =>
      hasBeenClicked(injury, point)
    );
    if (!clickedOnInjury) {
      handlers.addInjury({
        ...point,
        location: getLocationByPoint(point),
        data: null,
        id: new Date().getTime(),
      });

      toggleModal(true);
    } else {
      setToDelete(clickedOnInjury.id);
    }
  };
  const mainInjury = injuries?.find((injury) => injury.isMain);
  const mainInjuryName =
    mainInjury &&
    `${translation(mainInjury?.data?.toLowerCase() ?? "")} ${translation(
      mainInjury?.location ?? ""
    )}`;
  return (
    <>
      {showModal && (
        <InjuryModal
          closeHandler={() => toggleModal(false)}
          onChange={(data) => {
            console.log("data", data);
            handlers.updateByIndex(data, injuries.length - 1);
          }}
        />
      )}
      {readyForDelete && (
        <ConfirmModal
          closeHandler={() => setToDelete(null)}
          onConfirm={() => {
            handlers.removeInjury(readyForDelete);
            setToDelete(null);
          }}
        />
      )}

      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <SectionHeader label={translation("bodyPicker")} />
        </Card.Content>
        <TouchableWithoutFeedback onPress={handlePress}>
          <Card.Content style={[styles.innerContent]}>
            <BodyPicker />
          </Card.Content>
        </TouchableWithoutFeedback>
        <Card.Content
          style={[
            styles.innerContent,
            {
              width: "98%",
              marginLeft: "1%",
              marginTop: 40,
              flexDirection: "column",
              ...borderSetup,
            },
          ]}
        >
          <View>
            <DropDown
              testID="main-injury-selection"
              label={translation("mainInjurySelection")}
              initialValue={mainInjuryName}
              options={injuries
                .filter((injury) =>
                  [
                    E_InjuryType.BURN,
                    E_InjuryType.CUT,
                    E_InjuryType.GUNSHOT,
                    E_InjuryType.HIT,
                  ].includes(injury.data)
                )
                .map((injury) => ({
                  title: `${translation(
                    injury?.data?.toLowerCase() ?? ""
                  )} ${translation(injury?.location ?? "")}`,
                  id: injury?.id.toString(),
                }))}
              onSelect={({ id }) => {
                handlers.setMainInjury(Number(id));
              }}
            />
          </View>
          <Text style={{ fontWeight: "bold" }}>{translation("legend")}</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.legend, { borderLeftWidth: 0 }]}>
              <TouniquetLegend />
              <Text variant="bodySmall">{translation("TH")}</Text>
            </View>
            <View style={styles.legend}>
              <CGLegend />
              <Text variant="bodySmall">{translation("cg")}</Text>
            </View>
            <View style={styles.legend}>
              <KateterLegend />
              <Text variant="bodySmall">{translation("kateter")}</Text>
            </View>
            <View style={styles.legend}>
              <GunLegend />
              <Text variant="bodySmall">{translation("gunshot")}</Text>
            </View>
            <View style={styles.legend}>
              <HitLegend />
              <Text variant="bodySmall">{translation("hit")}</Text>
            </View>
            <View style={styles.legend}>
              <CutLegend />
              <Text variant="bodySmall">{translation("cut")}</Text>
            </View>
            <View style={styles.legend}>
              <BurnLegend />
              <Text variant="bodySmall">{translation("burn")}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  legend: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  card: design.card,
  content: design.content,
  innerContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 10,
  },
});

export default PatientBodyPicker;
