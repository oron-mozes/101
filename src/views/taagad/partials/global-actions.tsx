import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { DialogWrapper } from "../../../components/dialog";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../store/patients.record.store";
import { useStationStore } from "../../../store/station.store";

export function GlobalActions() {
  const translation = useTranslation();
  const [showDeleteModal, toggleDeleteModal] = useState<boolean>(false);
  const [showShareModal, toggleShareModal] = useState<boolean>(false);
  const deletePatients = usePatientRecordsStore(
    (state) => state.deletePatients
  );
  const hardStationReset = useStationStore((state) => state.hardStationReset);
  const unit_name = useStationStore((state) => state.station.unit_name);
  const [disabled, setDisable] = useState<boolean>(!Boolean(unit_name));

  useEffect(() => {
    setDisable(!Boolean(unit_name));
    return () => {
      setDisable(!Boolean(unit_name));
    };
  }, [unit_name]);
  return (
    <View style={[styles.container]}>
      <DialogWrapper
        testId="delete-station"
        visible={showDeleteModal}
        onClose={() => toggleDeleteModal(false)}
        title={translation("deleteStationTitle")}
        description={translation("deleteStationDescription")}
        onConfirm={async () => {
          await Promise.all([deletePatients(), hardStationReset()]);
          toggleDeleteModal(false);
        }}
      />
      <DialogWrapper
        testId="share-station"
        visible={showShareModal}
        onClose={() => toggleShareModal(false)}
        title={translation("shareTitle")}
        description={translation("shareDescription")}
        onConfirm={async () => {}}
      />
      <Button
        disabled={disabled}
        testID="delete-station"
        onPress={() => toggleDeleteModal(true)}
        icon="delete-outline"
        textColor="red"
      >
        {translation("deleteStation")}
      </Button>
      <Button
        disabled={disabled}
        onPress={() => toggleShareModal(true)}
        icon="share-variant-outline"
      >
        {translation("share")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",

    width: "100%",
  },
});
