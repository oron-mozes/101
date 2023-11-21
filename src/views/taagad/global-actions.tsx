import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { DialogWrapper } from "../../components/dialog";
import { useTranslation } from "../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import { useStationStore } from "../../store/station.store";

export function GlobalActions() {
  const translation = useTranslation();
  const [showDeleteModal, toggleDeleteModal] = useState<boolean>(false);
  const [showShareModal, toggleShareModal] = useState<boolean>(false);
  const deletePatients = usePatientRecordsStore(
    (state) => state.deletePatients
  );
  const hardStationReset = useStationStore((state) => state.hardStationReset);

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
        testID="delete-station"
        onPress={() => toggleDeleteModal(true)}
        icon="delete-outline"
        textColor="red"
      >
        {translation("deleteStation")}
      </Button>
      <Button
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
