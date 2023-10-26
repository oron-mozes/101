import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { PermissionsAndroid } from "react-native";
import { useEffect, useState } from "react";

export function useCamera() {
  const device = useCameraDevice("back");
  const [permission, updatePermission] = useState<string>();
  const [scannedInformation, updateScannedInformation] = useState<Code[]>();
  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      updateScannedInformation(codes);
      console.log(`Scanned ${codes.length} codes!`);
    },
  });
  useEffect(() => {
    const askForPermission = async () => {
      const permissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "<your title here>",
          message: "<your message here>",
          buttonNegative: "Deny",
          buttonPositive: "Allow",
        }
      );
      updatePermission(permissionGranted);
    };
    !permission && askForPermission();
  }, []);

  return { device, codeScanner, scannedInformation };
}
