import date from "date-and-time";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import locale from "../../locales/he.json";
import { IPatientRecord } from "../interfaces";
import { timeToDate } from "./date-to-time";

export const createPDFWithImage = async (
  imagePath: string,
  patient: IPatientRecord
) => {
  const htmlContent = `
          <html dir="rtl">
            <body>
            <h1>${locale.accountTitle}</h1>
            <table border="1">
                <tr>
                    <th>${locale.patientName}</th>
                    <th>${locale.idf_id}</th>
                    <th>${locale.patientId}</th>
                    <th>${locale.timeOfInjury}</th>
                    <th>${locale.timeOfTreatment}</th>
                    <th>${locale.date}</th>
                </tr>
                <tr>
                    <td>${patient.personal_information.full_name}></td>
                    <td>${patient.personal_information.idf_id}</td>
                    <td>${patient.personal_information.patientId}</td>
                    <td>${timeToDate(
                      new Date(patient.incident_information.injury_time)
                    )}</td>
                    <td>${timeToDate(
                      new Date(patient.incident_information.care_time)
                    )}</td>
                    <td>${date.format(
                      new Date(patient.incident_information.date),
                      "DD/MM/YY"
                    )}</td>
                </tr>
            </table>
            <h1>${locale.injuryReason}</h1>
            <table border="1">
                <tr>
                    <th>${locale.reasons}</th>
                    <th>${locale.circumstance}</th>
                   
                </tr>
                <tr>
                    <td>${patient.injuryReason.reasons.map(
                      (reason) => locale[reason]
                    )}</td>
                    <td>${patient.injuryReason.circumstance}</td>
                    
                </tr>
            </table>
            <h1>${locale.bodyPicker}</h1>
            <table border="1">
                <tr>
                    <th>העתק</th>
                </tr>
                <tr>
                    <td> <img src="${imagePath}" width="500" height="500" /></td>
                </tr>
            </table>
          
            <h1>${locale.avpu}</h1>
            <table border="1">
                <tr>
                    <th>סטטוס</th>
                </tr>
                <tr>
                    <td>${patient.consciousness.map(
                      (reason) => locale[reason]
                    )}</td> 
                </tr>
            </table>
            <h1>A</h1>
            <label>${locale.airWayInjury}? ${
    patient.airway.fulfill ? locale.yes : locale.no
  }</label>
            <table border="1">
                <tr>
                    <th>${locale.actionTaken}</th>
                    <th>${locale.actionTime}</th>
                    <th>${locale.actionResult}</th>
                </tr>
                ${patient.airway.actions.map(
                  (action) =>
                    `<tr>
                    <td>${locale[action.action]}</td> 
                    <td>${timeToDate(new Date(action.time))}</td> 
                    <td>${action.successful ? locale.yes : locale.no}</td> 
                  </tr>`
                )}
            </table>
            <h1>B</h1>
           
            <label>${locale.breathingCount}: ${
    patient.breathing.breathingCount
  }</label>
            <label>${locale.saturation}: ${patient.breathing.saturation}</label>
            <label>${locale.breathingInjury}? ${
    patient.breathing.fulfill ? locale.yes : locale.no
  }</label>
            <table border="1">
                <tr>
                    <th>${locale.actionTaken}</th>
                    <th>${locale.actionTime}</th>
                    <th>${locale.actionResult}</th>
                </tr>
                ${patient.breathing.actions.map(
                  (action) =>
                    `<tr>
                    <td>${locale[action.action]}</td> 
                    <td>${timeToDate(new Date(action.time))}</td> 
                    <td>${action.successful ? locale.yes : locale.no}</td> 
                  </tr>`
                )}
            </table>
            </body>
          </html>
        `;

  const file = await printToFileAsync({ html: htmlContent, base64: false });
  await shareAsync(file.uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "101 data",
    UTI: "com.microsoft.excel.xlsx",
  });
};
