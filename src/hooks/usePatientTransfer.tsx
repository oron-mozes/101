import { useNavigation } from "@react-navigation/native";
import { ComponentProps } from "react";
import { NfcIcon } from "../components/nfc-dialog/nfc-icon";
import type { StackNavigation } from "../interfaces";
import { NfcStatus, useNfcStore } from "../store/nfc.store";
import { useStationStore } from "../store/station.store";

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
