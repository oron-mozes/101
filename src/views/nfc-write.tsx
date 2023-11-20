import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import NfcManager, { Ndef, NfcEvents } from "react-native-nfc-manager";

const NFCWriteExample = () => {
  useEffect(() => {
    initNFC();

    return () => {
      cleanUp();
    };
  }, []);

  const initNFC = async () => {
    try {
      await NfcManager.start();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, handleNdefDiscovery);
    } catch (error) {
      console.warn("Error initializing NFC:", error);
    }
  };

  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  const handleNdefDiscovery = async (tag) => {
    try {
      const message = [
        Ndef.textRecord("Hello, NFC!"), // Prepare the data to write (text message)
      ];
      const bytes = Ndef.encodeMessage(message);

      await NfcManager.ndefHandler.writeNdefMessage(bytes); // Write the prepared data to the tag
      console.log("Successfully wrote to NFC tag!");
    } catch (error) {
      console.warn("Error writing to NFC:", error);
    }
  };

  const startNFC = async () => {
    try {
      await NfcManager.requestTechnology(NfcManager.Ndef);
    } catch (error) {
      console.warn("Error starting NFC:", error);
    }
  };

  return (
    <View>
      <Text>NFC Write Example</Text>
      <Button title="Start NFC Write" onPress={startNFC} />
    </View>
  );
};

export default NFCWriteExample;
