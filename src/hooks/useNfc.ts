import NfcManager from "react-native-nfc-manager";

import { useEffect, useState } from "react";

export function useNfc() {
  const [nfcSupported, setNfcPermission] = useState<boolean>();

  useEffect(() => {
    checkNfcPermission();
  }, []);

  const checkNfcPermission = async () => {
    try {
      await NfcManager.isEnabled();
      setNfcPermission(true);
    } catch (error) {
      console.error("Error checking NFC permission:", error);
      setNfcPermission(false);
    } finally {
      //   await NfcManager.();
    }
  };
  return [nfcSupported];
}
