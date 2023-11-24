import { Dialog, IconButton, Portal, Text } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import { NfcStatus, useNfcStore } from "../../store/nfc.store";
import { NfcIcon } from './nfc-icon';
import { StyleSheet } from "react-native";
import { inputFontSize } from "../../shared-config";
import { isType } from "variant";

export function NfcDialogWrapper() {
  const { nfcStatus, nfcTransferStatus, closeNfcDialog } = useNfcStore();
  const translation = useTranslation();
  const isDialogOpen = !isType(nfcStatus, NfcStatus.Idle);
  const primaryColor = isDialogOpen && nfcTransferStatus.color;

  return (
    <Portal>
      <Dialog dismissableBackButton={false} dismissable={false} visible={isDialogOpen} style={styles.dialog}>
        <IconButton
          style={{ alignSelf: 'flex-start' }}
          onPress={closeNfcDialog}
          testID={`nfc-dialog-close-button`}
          icon={'close'}
        />
        <NfcIcon color={primaryColor} />
        <Dialog.Title testID={`nfc-dialog-title`} style={{ ...styles.dialogTitle, color: primaryColor }}>
          {'העברת פצועים פעילה'}
        </Dialog.Title>
        <Dialog.Content>
          <Text
            variant="bodyMedium"
            testID={`nfc-dialog-description`}
            style={{ fontSize: inputFontSize }}
          >
            {'יש להחזיק את המכשירים קרוב ולא לנתק עד לסיום'}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "flex-start" }}>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
