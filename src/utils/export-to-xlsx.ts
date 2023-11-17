import XLSX from "xlsx";
import {
  documentDirectory,
  makeDirectoryAsync,
  writeAsStringAsync,
  EncodingType,
} from "expo-file-system";
import Sharing from "expo-sharing";
import { IInjury, IPatientRecord } from "../interfaces";
import { getLocaleKey } from "./helpers";
import locale from "../../locales/he.json";

function injuriesList(data: IInjury[]) {}

function convertToReadableData(data: IPatientRecord[]) {
  return data.map((patient) => ({
    ...getLocaleKey(patient.personal_information),
    ...getLocaleKey(patient.incident_information),
    [locale.providerTeam]: JSON.stringify(getLocaleKey(patient.providers)),
    // [locale.injuryReason]: JSON.stringify(getLocaleKey(patient.injuries)),
    
  }));
}

export async function generateXLSX(data: IPatientRecord[]) {
  const date = new Date().getTime();
  const ws = XLSX.utils.json_to_sheet(convertToReadableData(data));
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

  await Sharing.shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "101 data",
    UTI: "com.microsoft.excel.xlsx",
  });
}
