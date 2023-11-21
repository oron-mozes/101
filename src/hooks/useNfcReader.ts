import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import { polyfill } from "react-native-polyfill-globals/src/encoding";
polyfill();
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
    console.log(JSON.stringify(tag));
    const buffer = new Uint8Array(tag.ndefMessage[0].payload);
    // console.log(`${tag.ndefMessage[0]}`, { buffer, text: buffer.toString() });
    // var buffer = Buffer.from(arr);

    // const a = btoa(String.fromCharCode.apply(null, buffer));
    console.log("??????", { buffer });
    // Create a TextDecoder instance
    const textDecoder = new TextDecoder("utf-8");

    // Decode the buffer to a stringr
    const decodedString = textDecoder.decode(buffer);
    const message = `TAG2:${decodedString}`;

    console.log(message);
  }
  return { readTag, logs };
}
