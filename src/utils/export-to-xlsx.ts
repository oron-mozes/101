import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { IInjury, IPatientRecord } from "../interfaces";
import locale from "../../locales/he.json";
import { timeToDate } from "./date-to-time";
import date from "date-and-time";

function convertor(key, value) {
  switch (key) {
    case "injury_time":
    case "care_time":
      return timeToDate(value);
    case "date":
      return date.format(new Date(value), "DD/MM/YY");
    default:
      return value;
  }
}

function getLocaleKey(data) {
  const res = {};
  for (const key in data) {
    res[locale[key]] = convertor(key, data[key]);
  }

  return res;
}

function injuriesList(data: IInjury[]) {}

function convertToReadableData(data: IPatientRecord[]) {
  return data.map((patient) => ({
    ...getLocaleKey(patient.personal_information),
    ...getLocaleKey(patient.incident_information),
    [locale.providerTeam]: JSON.stringify(getLocaleKey(patient.provider)),
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
  const uri = FileSystem.documentDirectory + `${date}.xlsx`;
  const downloadsDirectory = FileSystem.documentDirectory + "downloads/";

  await FileSystem.makeDirectoryAsync(downloadsDirectory, {
    intermediates: true,
  });

  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await Sharing.shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "101 data",
    UTI: "com.microsoft.excel.xlsx",
  });
}
