import {
  EncodingType,
  documentDirectory,
  makeDirectoryAsync,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { shareAsync } from "expo-sharing";
import XLSX from "xlsx";
import locale from "../../locales/he.json";
import { IPatientRecord } from "../interfaces";
import { getLocaleKey } from "./helpers";
// import XlsxPopulate from "xlsx-populate";
import ImgToBase64 from "react-native-image-base64";
import { createPDFWithImage } from "./create-pdf";

async function getImage64(imageUri: string) {
  return manipulateAsync(imageUri, [], { compress: 1, format: SaveFormat.PNG });
}

async function convertToReadableData(data: IPatientRecord[]) {
  return data.map((patient, index) => {
    return [
      ...getLocaleKey(patient.personal_information),
      ...getLocaleKey(patient.incident_information),
      {
        [locale.providerTeam]: JSON.stringify(getLocaleKey(patient.providers)),
      },
      // [locale.injuryReason]: base64Image,
    ];
  });
}

export async function generateXLSX(
  data: IPatientRecord[],
  patientsImage: string[]
) {
  return createPDFWithImage(patientsImage[0]);

  const date = new Date().getTime();
  // const dataToSave = await convertToReadableData(data);
  // const image = await getImage64(patientsImage[0]);
  // console.log({ image });
  // const base64Image = await readAsStringAsync(image.uri, {
  //   encoding: EncodingType.Base64,
  // });
  const base64Image = await ImgToBase64.getBase64String(patientsImage[0]);

  const dataToSave = [
    ["Name", "Age", "Image"],
    ["John Doe", 25, base64Image],
    // Add more rows as needed
  ];
  const ws = XLSX.utils.aoa_to_sheet(dataToSave);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Patients");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = documentDirectory + `${date}.xlsx`;
  const downloadsDirectory = documentDirectory + "downloads/";

  await makeDirectoryAsync(downloadsDirectory, {
    intermediates: true,
  });

  await writeAsStringAsync(uri, wbout, {
    encoding: EncodingType.Base64,
  });

  await shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "101 data",
    UTI: "com.microsoft.excel.xlsx",
  });
}
