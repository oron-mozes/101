import { Dialog, IconButton, Portal, Text } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import {
  NfcStatus,
  NfcTransferStatus,
  useNfcStore,
} from "../../store/nfc.store";
import { NfcIcon } from "./nfc-icon";
import { StyleSheet } from "react-native";
import { inputFontSize } from "../../shared-config";
import { match, matcher, isType } from "variant";
import { useNfc } from "../../hooks/useNfc";
import { useEffect } from "react";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import { compress } from "compress-json";
import _ from "lodash";

export function NfcDialogWrapper() {
  const { readTag, writeNdef } = useNfc();
  const { nfcStatus, nfcTransferStatus, closeNfcDialog } = useNfcStore();
  const { patients } = usePatientRecordsStore();
  const translation = useTranslation();

  useEffect(() => {
    if (!isType(nfcTransferStatus, NfcTransferStatus.Waiting)) return;

    match(nfcStatus, {
      Idle: () => {},
      Receiving: () => readTag(),
      Sending: ({ patientsIds }) => {
        let patientsDataToSend = patients.filter((patient) =>
          patientsIds.includes(patient.personal_information.patientId)
        );
        patientsDataToSend = patientsDataToSend.map((patient) => {
          return {
            ...patient,
            image: "",
          };
        });

        const compressed = compress(patientsDataToSend);

        writeNdef(JSON.stringify(compressed));
      },
    });
  }, [nfcStatus, nfcTransferStatus]);

  return matcher(nfcStatus)
    .when(NfcStatus.Idle, () => null)
    .when([NfcStatus.Receiving, NfcStatus.Sending], ({ text }) => (
      <Portal>
        <Dialog
          dismissableBackButton={false}
          dismissable={false}
          visible={true}
          style={styles.dialog}
        >
          <IconButton
            style={{ alignSelf: "flex-start" }}
            onPress={closeNfcDialog}
            testID="nfc-dialog-close-button"
            icon="close"
          />
          <NfcIcon color={nfcTransferStatus.color} />
          <Dialog.Title
            testID="nfc-dialog-title"
            style={{ ...styles.dialogTitle, color: nfcTransferStatus.color }}
          >
            {`${text} ${nfcTransferStatus.statusText}`}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyMedium"
              testID={`nfc-dialog-description`}
              style={{ fontSize: inputFontSize }}
            >
              {nfcTransferStatus.text}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    ))
    .complete();
}

const styles = StyleSheet.create({
  dialog: {
    justifyContent: "center",
    alignItems: "center",
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
