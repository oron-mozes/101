import { compress } from "compress-json";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, IconButton, Portal, Text } from "react-native-paper";
import { isType, match, matcher } from "variant";
import { useTranslation } from "../../hooks/useMyTranslation";
import { useNfc } from "../../hooks/useNfc";
import { STATUS } from "../../interfaces";
import { colors, inputFontSize } from "../../shared-config";
import {
  NfcStatus,
  NfcTransferStatus,
  useNfcStore,
} from "../../store/nfc.store";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import { NfcIcon } from "./nfc-icon";

export function NfcDialogWrapper() {
  const { readTag, writeNdef, close, writeNdefToCard } = useNfc();
  const { nfcStatus, nfcTransferStatus, closeNfcDialog } = useNfcStore();
  const { patients, updatePatientStatus } = usePatientRecordsStore();
  const addPatient = usePatientRecordsStore((state) => state.addPatient);
  const translation = useTranslation();
  const [allowClose, setAllowClose] = useState<boolean>(false);
  const [patientsIds, setPatientsIds] = useState<string[]>([]);
  useEffect(() => {
    if (!isType(nfcTransferStatus, NfcTransferStatus.Waiting)) return;

    match(nfcStatus, {
      Idle: () => {},
      Receiving: () =>
        readTag(async (parsedData) => {
          await Promise.all([
            parsedData.records.map((patient) =>
              addPatient({ ...patient, new: true })
            ),
          ]);
        }),
      Sending: ({ patientsIds, destination }) => {
        setAllowClose(false);
        setPatientsIds(patientsIds);
        const patientsDataToSend = patients.filter((patient) =>
          patientsIds.includes(patient.personal_information.patientId)
        );

        const compressed = compress({ records: patientsDataToSend });
        destination === "card"
          ? writeNdefToCard(JSON.stringify(compressed), async () => {
              close();
            })
          : writeNdef(JSON.stringify(compressed), async () => {
              setAllowClose(true);
            });
      },
    });
  }, [nfcStatus, nfcTransferStatus]);

  useEffect(() => {
    return () => {
      setAllowClose(false);
    };
  }, []);
  return matcher(nfcStatus)
    .when(NfcStatus.Idle, () => null)
    .when([NfcStatus.Receiving, NfcStatus.Sending], ({ text }) => (
      <Portal>
        <Dialog
          dismissableBackButton={false}
          dismissable={false}
          visible={true}
          style={[
            styles.dialog,
            {
              backgroundColor: nfcTransferStatus.color ?? "white",
            },
          ]}
        >
          <IconButton
            style={{
              alignSelf: "flex-start",
            }}
            iconColor={nfcTransferStatus.color ? "white" : colors.text}
            onPress={() => {
              close();
              closeNfcDialog();
            }}
            testID="nfc-dialog-close-button"
            icon="close"
          />
          <NfcIcon color={"#fff"} />
          <Dialog.Title
            testID="nfc-dialog-title"
            style={{
              ...styles.dialogTitle,
              color: nfcTransferStatus.color ? "white" : colors.text,
            }}
          >
            {`${text} ${nfcTransferStatus.statusText}`}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyMedium"
              testID={`nfc-dialog-description`}
              style={{
                fontSize: inputFontSize,
                color: nfcTransferStatus.color ? "white" : colors.text,
              }}
            >
              {nfcTransferStatus.text}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            {allowClose && (
              <Button
                mode="outlined"
                testID="nfc-dialog-close"
                textColor={nfcTransferStatus.color ? "white" : colors.text}
                onPress={async () => {
                  await updatePatientStatus(patientsIds, STATUS.CLOSED);
                  setAllowClose(false);
                  close();
                  closeNfcDialog();
                }}
              >
                {translation("confirm")}
              </Button>
            )}
          </Dialog.Actions>
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
