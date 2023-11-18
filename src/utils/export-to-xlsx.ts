import {
  EncodingType,
  documentDirectory,
  makeDirectoryAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { shareAsync } from "expo-sharing";
import XLSX from "xlsx";
import locale from "../../locales/he.json";
import { IPatientRecord } from "../interfaces";
import { getLocaleKey } from "./helpers";

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
  const date = new Date().getTime();
  const dataToSave = await convertToReadableData(data);

  const ws = XLSX.utils.json_to_sheet(dataToSave);
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
