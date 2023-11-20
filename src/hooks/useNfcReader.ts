import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";

export function useNFCReader() {
  const [logs, addLog] = useState<string>();

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.log(`TAG:${JSON.stringify(tag)}`);
      ToastAndroid.show(`TAG:${JSON.stringify(tag)}`, ToastAndroid.LONG);
      // addLog(JSON.stringify(tag));
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  // async function readTag() {
  //   await NfcManager.start();
  //   await NfcManager.registerTagEvent();
  // }
  async function readTag() {
    await NfcManager.requestTechnology([
      NfcTech.IsoDep,
      NfcTech.NfcA,
      NfcTech.Ndef,
    ]);
    const tag = await NfcManager.getTag();
    console.warn("Tag found", tag);
    ToastAndroid.show(`TAG:${JSON.stringify(tag)}`, ToastAndroid.LONG);
  }
  return { readTag, logs };
}
