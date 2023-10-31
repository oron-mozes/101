import { useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";
import {
  Code,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from "react-native-vision-camera";

export function useCamera() {
  const device = useCameraDevice("back");
  const [permission, updatePermission] = useState<string>();
  const [scannedInformation, updateScannedInformation] = useState<Code[]>();
  const format = useCameraFormat(device, [
    { videoResolution: { width: 250, height: 250 } },
    { fps: 60 },
  ]);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      updateScannedInformation(codes);
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

  return { device, codeScanner, scannedInformation, format };
}
