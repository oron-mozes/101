import { useEffect, useState } from "react";
import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";

export function useNFCReader() {
  const [logs, addLog] = useState<string>();

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.log(tag);
      addLog(JSON.stringify(tag));
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  async function readTag() {
    console.log("TAG??");
    await NfcManager.start();
    await NfcManager.registerTagEvent();
  }
  return { readTag, logs };
}
