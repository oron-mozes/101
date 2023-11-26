import { NfcStatus, useNfcStore } from "../store/nfc.store";
import { ComponentProps } from "react";
import { useStationStore } from "../store/station.store";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigation } from "../interfaces";
import { ROUTES } from "../routes";
import { NfcIcon } from "../components/nfc-dialog/nfc-icon";
import { QrIcon } from "../components/qr-icon/qr";
import { usePatientRecordsStore } from "../store/patients.record.store";

export function usePatientTransfer() {
  const { openNfcDialog } = useNfcStore();
  const { station: { communicationMethod } } = useStationStore();
  const { patients } = usePatientRecordsStore();
  const { navigate } = useNavigation<StackNavigation>();

  const transferPatient = ({ patientsIds }: { patientsIds: string[] }) => {
    if (communicationMethod === "NFC") {
      openNfcDialog(NfcStatus.Sending({ patientsIds }));
    } else if (communicationMethod === "QR") {
      const patientToTransfer = patients.find(patient => patient.personal_information.patientId === patientsIds[0]);
      navigate(ROUTES.EXPORT_PATIENT, { patient: patientToTransfer });
    };
  };

  const receivePatient = () => {
    if (communicationMethod === "NFC") {
      openNfcDialog(NfcStatus.Receiving());
    } else if (communicationMethod === "QR") {
      navigate(ROUTES.IMPORT_PATIENT);
    };
  };

  const CommunicationIcon = (props: ComponentProps<typeof NfcIcon> | ComponentProps<typeof QrIcon>) => {
    if (communicationMethod === "NFC") {
      return <NfcIcon {...props} />
    } else if (communicationMethod === "QR") {
      return <QrIcon {...props} />
    };
  };

  return {
    transferPatient,
    receivePatient,
    CommunicationIcon
  }
}
