import { useEffect } from "react";
import NfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";

export function useNFCReader() {
  useEffect(() => {
    initNfc();
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);
  async function initNfc() {
    const well = await NfcManager.isEnabled();
    console.log({ NfcManager, well });
    try {
      console.log("????", { well });
      //   NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      //     console.log("tag found!!!!!!!!!", { tag });
      //   });
      //   await NfcManager.start();
    } catch (e) {
      console.log("BADD!!!!?", e);
    }
  }

  const readTag = async () => {
    console.log("11@@@@@@@");
    await NfcManager.registerTagEvent();
  };
  console.log("LOAD!!");
  return readTag;
}
