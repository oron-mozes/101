import { NfcStatus, useNfcStore } from "../store/nfc.store";
import { ComponentProps } from "react";
import { useStationStore } from "../store/station.store";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigation } from "../interfaces";
import { ROUTES } from "../routes";
import { NfcIcon } from "../components/nfc-dialog/nfc-icon";
import { usePatientRecordsStore } from "../store/patients.record.store";

export function usePatientTransfer() {
  const { openNfcDialog } = useNfcStore();
  const {
    station: { communicationMethod },
  } = useStationStore();
  const { navigate } = useNavigation<StackNavigation>();

  const transferPatient = ({ patientsIds }: { patientsIds: string[] }) => {
    openNfcDialog(NfcStatus.Sending({ patientsIds }));
  };

  const receivePatient = () => {
    openNfcDialog(NfcStatus.Receiving());
  };

  const CommunicationIcon = (props: ComponentProps<typeof NfcIcon>) => {
    return <NfcIcon {...props} />;
  };

  return {
    transferPatient,
    receivePatient,
    CommunicationIcon,
  };
}
