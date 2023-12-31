import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useTranslation } from "../hooks/useMyTranslation";
import { useGlobalStore } from "../store/global.store";

import { usePatientRecordsStore } from "../store/patients.record.store";

export function DeleteDialog() {
  const translation = useTranslation();
  const {
    performActionForPatients,
    deleteBulkPatients,
    resetPerformActionForPatients,
    toggleDeleteBulkPatients,
  } = useGlobalStore();

  const deletePatientsById = usePatientRecordsStore(
    (state) => state.deletePatientsById
  );
  return (
    <Portal>
      <Dialog visible={deleteBulkPatients} onDismiss={toggleDeleteBulkPatients}>
        <Dialog.Title testID="delete-dialog-title">
          {translation("delete")}
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" testID="delete-dialog-description">
            {translation("deletePatientDescription")}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "flex-start" }}>
          <Button
            onPress={async () => {
              await deletePatientsById(performActionForPatients);
              toggleDeleteBulkPatients();
              resetPerformActionForPatients();
            }}
            mode="contained"
            testID="delete-dialog-confirm"
          >
            {translation("deleteRecord")}
          </Button>
          <Button
            onPress={toggleDeleteBulkPatients}
            testID="delete-dialog-cancel"
          >
            {translation("cancel")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default DeleteDialog;
