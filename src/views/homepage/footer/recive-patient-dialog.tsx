import { useNavigation } from "@react-navigation/native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { StackNavigation } from "../../../interfaces";
import { ROUTES } from "../../../routes";

export function ReceivePatientDialog({ onClose }: { onClose(): void }) {
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();

  return (
    <Portal>
      <Dialog visible={true} onDismiss={onClose}>
        <Dialog.Title testID="receive-dialog-title">
          {translation("receiveMethod")}
        </Dialog.Title>

        <Dialog.Actions style={{ justifyContent: "flex-start" }}>
          <Button
            onPress={() => {
              onClose();
            }}
            mode="contained"
            testID="receive-dialog-nfc-method"
          >
            {translation("selectNFCMethod")}
          </Button>
          <Button
            onPress={() => {
              navigation.navigate(ROUTES.IMPORT_PATIENT);
              onClose();
            }}
            testID="receive-dialog-qr-method"
          >
            {translation("selectQrMethod")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
