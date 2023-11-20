import { useState } from "react";
import { ToastAndroid } from "react-native";
import {
  HCESession,
  NFCTagType4,
  NFCTagType4NDEFContentType,
} from "react-native-hce";

export function useNFCSender() {
  const [logsWrite, addLog] = useState<string>();
  let session;
  async function writeNdef() {
    addLog("CAll");
    ToastAndroid.show("Yalla", 1000);
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content: "Hello world",
      writable: false,
    });
    addLog("TAG");
    session = await HCESession.getInstance();
    session.setApplication(tag);
    addLog("TAG E");
    await session.setEnabled(true);
  }
  return { writeNdef, logsWrite };
}
