import { useEffect } from "react";
import NfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";

export function useNFCSender() {
  useEffect(() => {
    initNfc();
  }, []);
  async function initNfc() {
    try {
      const well = await NfcManager.isEnabled();
      // console.log("????", { well });
      // await NfcManager.start();
    } catch (e) {
      console.log("BADD!!!!", e);
    }
  }

  async function writeNdef({ type, value }) {
    let result = false;
    console.log("???????");
    try {
      // Step 1
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: "Ready to write some NDEF",
      });

      const bytes = Ndef.encodeMessage([Ndef.textRecord("Hello NFC")]);

      if (bytes) {
        await NfcManager.ndefHandler // Step2
          .writeNdefMessage(bytes); // Step3
      }

      result = true;
    } catch (ex) {
      console.warn(ex);
    }

    // Step 4
    NfcManager.cancelTechnologyRequest().catch(() => 0);
    return result;
  }
  return writeNdef;
}
