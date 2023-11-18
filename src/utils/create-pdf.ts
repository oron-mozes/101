import date from "date-and-time";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import locale from "../../locales/he.json";
import { IPatientRecord } from "../interfaces";
import { timeToDate } from "./date-to-time";
import { calcGCS } from "../views/homepage/tabs/report-tab/create-components/utils";

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
                    <td>${patient.injuryReason.reasons
                      ?.map((reason) => locale[reason])
                      .join(", ")}</td>
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
                    <td>${patient.consciousness?.map(
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
                ${patient.airway.actions?.map(
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
                ${patient.breathing.actions?.map(
                  (action) =>
                    `<tr>
                    <td>${locale[action.action]}</td> 
                    <td>${timeToDate(new Date(action.time))}</td> 
                    <td>${action.successful ? locale.yes : locale.no}</td> 
                  </tr>`
                )}
            </table>
            <h1>C</h1>
            <label>${locale.palpated}? ${
    patient.measurements.palpated ? locale.yes : locale.no
  }</label>
            <label>${locale.shock}? ${
    patient.measurements.shock ? locale.yes : locale.no
  }</label>
            <label>${locale.puls}: ${patient.measurements.puls}</label>
            <label>${locale.bloodPressure}: ${
    patient.measurements.bloodPressure
  }</label>
            <table border="1">
                <tr>
                    <th>${locale.actionTaken}</th>
                    <th>${locale.actionTime}</th>
                    <th>${locale.actionResult}</th>
                </tr>
                ${patient.measurements.actions?.map(
                  (action) =>
                    `<tr>
                    <td>${locale[action.action]}</td> 
                    <td>${timeToDate(new Date(action.time))}</td> 
                    <td>${action.successful ? locale.yes : locale.no}</td> 
                  </tr>`
                )}
            </table>
            <h1>D</h1>
            <label>${locale.general}: ${patient.reaction.general
    ?.map((stat) => locale[stat])
    .join(", ")}</label>
            <table border="1">
                <tr>
                    <th>${locale.movement}</th>
                    <th>${locale.speech}</th>
                    <th>${locale.eyes}</th>
                    <th>${locale.GCS}</th>
                </tr>
                <tr>
                <td>${locale[patient.reaction.movement]}</td> 
                <td>${locale[patient.reaction.speech]}</td> 
                <td>${locale[patient.reaction.eyes]}</td> 
                <td>${calcGCS({
                  eyes: patient.reaction.eyes,
                  movement: patient.reaction.movement,
                  speech: patient.reaction.speech,
                })}</td> 
              </tr>
            </table>
         
            <h1>E</h1>
            <table border="1">
                <tr>
                    <td>${patient.eSection
                      ?.map((reason) => locale[reason])
                      .join(", ")}</td> 
                </tr>
            </table>
            <h1>${locale.medicationsAndFluid}</h1>
            <table border="1">
                <tr>
                    <td>${locale.medicationsAndFluid}</td> 
                    <td>${locale.type}</td> 
                    <td>${locale.dose}</td> 
                </tr>
                ${patient.medicationsAndFluids.actions?.map(
                  (med) => `<tr>
                    <td>${locale[med.treatment]}</td> 
                    <td>${med.type ? locale[med.type] : ""}</td> 
                    <td>${locale[med.dose]}</td> 
                    <td>${timeToDate(new Date(med.time))}</td> 
                </tr>`
                )}
            </table>
            <h1>${locale.prognosis}</h1>
            <p>${patient.prognosis}</p>

            <h1>${locale.careProviderSection}</h1>
            <table border="1">
                <tr>
                    <td>${locale.careProviderName}</td> 
                </tr>
                ${patient.providers?.map(
                  (provider) => `<tr>
                    <td>${provider.full_name}, ${provider.idf_id}, ${
                    locale[provider.role]
                  }</td> 
                </tr>`
                )}
            </table>
             <h1>${locale.evacuate}</h1>
            <label>${locale.destination}: ${
    patient.evacuation.destination
  }</label>
            <label>${locale.actionTime}: ${timeToDate(
    new Date(patient.evacuation.time)
  )}</label>
            <table border="1">
              <tr>
                  <td>${locale.special_care}</td> 
                  <td>אופן פינוי</td> 
                  <td>סטטוס</td> 
              </tr>
              <tr>
                  <td>${
                    patient.evacuation.special_care ? locale.yes : locale.no
                  }</td> 
                  <td>${locale[patient.evacuation.transportation]}</td> 
                  <td>${locale[patient.evacuation.status]}</td> 
              </tr>
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
