import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";

const NFCPeerToPeer = () => {
  useEffect(() => {
    // Initialize NFC Manager when component mounts
    initNFC();

    return () => {
      // Clean up NFC Manager when component unmounts
      cleanUp();
    };
  }, []);

  const initNFC = async () => {
    try {
      await NfcManager.start();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, handleNdefDiscovery);
      // Handle other NFC technologies like NfcTech.MifareClassic, NfcTech.NfcA, etc.
    } catch (error) {
      console.warn("Error initializing NFC:", error);
    }
  };

  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  const handleNdefDiscovery = (tag) => {
    if (tag.ndefMessage) {
      // Process the received data from the tag
      console.log("Received NDEF message:", tag.ndefMessage);
    }
  };

  const startNFC = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // Wait for tag to be discovered and handleNdefDiscovery will be called
    } catch (error) {
      console.warn("Error starting NFC:", error);
    }
  };

  return (
    <View>
      <Text>NFC Peer-to-Peer Communication</Text>
      <Button title="Start NFC" onPress={startNFC} />
      {/* Add UI components for displaying received NFC data */}
    </View>
  );
};

export default NFCPeerToPeer;
