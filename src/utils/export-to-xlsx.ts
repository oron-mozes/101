import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

var data = [
  {
    name: "John",
    city: "Seattle",
  },
  {
    name: "Mike",
    city: "Los Angeles",
  },
  {
    name: "Zach",
    city: "New York",
  },
];
export  async function generateXLSX() {
  const date = new Date().getTime();
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Patients");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.cacheDirectory + `${date}.xlsx`;
  console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
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
