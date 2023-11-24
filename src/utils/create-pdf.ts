import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import locale from "../../locales/he.json";
import { IPatientRecord } from "../interfaces";
import { colors } from "../shared-config";
import {
  returnBodyPicker,
  returnInfoTable,
  returnInjuryReasonsTable,
} from "./helpers";

export const createPDFWithImage = async (
  imagePath: string,
  patient: IPatientRecord
) => {
  const htmlContent = `
          <html dir="rtl">
            <body>
            <header style="height: 58px; padding:14px 32.5px; margin-bottom: 20px; background: ${
              colors.primary
            }">
            
            </header>
            <main>
            ${returnInfoTable(locale.accountTitle, [
              {
                ...patient.personal_information,
                ...patient.incident_information,
              },
            ])}
            ${returnInjuryReasonsTable(
              patient.injuryReason.reasons,
              patient.injuryReason.circumstance
            )}
            ${returnInfoTable(locale.evacuate, [
              {
                ...patient.evacuation,
              },
            ])}
            ${returnBodyPicker(imagePath)}
  
              </main>
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

//           <h1>${locale.bodyPicker}</h1>
//           <table border="1">
//               <tr>
//                   <th>העתק</th>
//               </tr>
//               <tr>
//                   <td> <img src="${imagePath}" width="500" height="500" /></td>
//               </tr>
//           </table>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//           <h1>${locale.avpu}</h1>
//           <table border="1">
//               <tr>
//                   <th>סטטוס</th>
//               </tr>
//               <tr>
//                   <td>${patient.consciousness?.map(
//                     (reason) => locale[reason]
//                   )}</td>
//               </tr>
//           </table>
//           <h1>A</h1>
//           <label>${locale.airWayInjury}? ${
//   patient.airway.fulfill ? locale.yes : locale.no
// }</label>
//           <table border="1">
//               <tr>
//                   <th>${locale.actionTaken}</th>
//                   <th>${locale.actionTime}</th>
//                   <th>${locale.actionResult}</th>
//               </tr>
//               ${patient.airway.actions?.map(
//                 (action) =>
//                   `<tr>
//                   <td>${locale[action.action]}</td>
//                   <td>${timeToDate(new Date(action.time))}</td>
//                   <td>${action.successful ? locale.yes : locale.no}</td>
//                 </tr>`
//               )}
//           </table>
//           <h1>B</h1>

//           <label>${locale.breathingCount}: ${
//   patient.breathing.breathingCount
// }</label>
//           <label>${locale.saturation}: ${patient.breathing.saturation}</label>
//           <label>${locale.breathingInjury}? ${
//   patient.breathing.fulfill ? locale.yes : locale.no
// }</label>
//           <table border="1">
//               <tr>
//                   <th>${locale.actionTaken}</th>
//                   <th>${locale.actionTime}</th>
//                   <th>${locale.actionResult}</th>
//               </tr>
//               ${patient.breathing.actions?.map(
//                 (action) =>
//                   `<tr>
//                   <td>${locale[action.action]}</td>
//                   <td>${timeToDate(new Date(action.time))}</td>
//                   <td>${action.successful ? locale.yes : locale.no}</td>
//                 </tr>`
//               )}
//           </table>
//           <h1>C</h1>
//           <label>${locale.palpated}? ${
//   patient.measurements.palpated ? locale.yes : locale.no
// }</label>
//           <label>${locale.shock}? ${
//   patient.measurements.shock ? locale.yes : locale.no
// }</label>
//           <label>${locale.puls}: ${patient.measurements.puls}</label>
//           <label>${locale.bloodPressure}: ${
//   patient.measurements.bloodPressure
// }</label>
//           <table border="1">
//               <tr>
//                   <th>${locale.actionTaken}</th>
//                   <th>${locale.actionTime}</th>
//                   <th>${locale.actionResult}</th>
//               </tr>
//               ${patient.measurements.actions?.map(
//                 (action) =>
//                   `<tr>
//                   <td>${locale[action.action]}</td>
//                   <td>${timeToDate(new Date(action.time))}</td>
//                   <td>${action.successful ? locale.yes : locale.no}</td>
//                 </tr>`
//               )}
//           </table>
//           <h1>D</h1>
//           <label>${locale.general}: ${patient.reaction.general
//   ?.map((stat) => locale[stat])
//   .join(", ")}</label>
//           <table border="1">
//               <tr>
//                   <th>${locale.movement}</th>
//                   <th>${locale.speech}</th>
//                   <th>${locale.eyes}</th>
//                   <th>${locale.GCS}</th>
//               </tr>
//               <tr>

//               <td>${locale[patient.reaction.movement]}</td>
//               <td>${locale[patient.reaction.speech]}</td>
//               <td>${locale[patient.reaction.eyes]}</td>
//               <td>${calcGCS({
//                 eyes: patient.reaction.eyes,
//                 movement: patient.reaction.movement,
//                 speech: patient.reaction.speech,
//               })}</td>
//             </tr>
//           </table>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <h1>E</h1>
//           <table border="1">
//               <tr>
//                   <td>${patient.eSection
//                     ?.map((reason) => locale[reason])
//                     .join(", ")}</td>
//               </tr>
//           </table>
//           <h1>${locale.medicationsAndFluid}</h1>
//           <table border="1">
//               <tr>
//                   <td>${locale.medicationsAndFluid}</td>
//                   <td>${locale.type}</td>
//                   <td>${locale.dose}</td>
//               </tr>
//               ${patient.medicationsAndFluids.actions?.map(
//                 (med) => `<tr>
//                   <td>${locale[med.treatment]}</td>
//                   <td>${med.type ? locale[med.type] : ""}</td>
//                   <td>${locale[med.dose]}</td>
//                   <td>${timeToDate(new Date(med.time))}</td>
//               </tr>`
//               )}
//           </table>
//           <h1>${locale.prognosis}</h1>
//           <p>${patient.prognosis}</p>

//           <h1>${locale.careProviderSection}</h1>
//           <table border="1">
//               <tr>
//                   <td>${locale.careProviderName}</td>
//               </tr>
//               ${patient.providers?.map((provider) => {
//                 if (!provider) {
//                   return `<tr/>`;
//                 }
//                 return `<tr>
//                   <td>${provider?.full_name}, ${provider?.idf_id}, ${
//                   locale[provider?.role]
//                 }</td>
//               </tr>`;
//               })}
//           </table>
//            <h1>${locale.evacuate}</h1>
//           <label>${locale.destination}: ${
//   patient.evacuation.destination
// }</label>
//           <label>${locale.actionTime}: ${timeToDate(
//   new Date(patient.evacuation.time)
// )}</label>
//           <table border="1">
//             <tr>
//                 <td>${locale.special_care}</td>
//                 <td>אופן פינוי</td>
//                 <td>סטטוס</td>
//             </tr>
//             <tr>
//                 <td>${
//                   patient.evacuation.special_care ? locale.yes : locale.no
//                 }</td>
//                 <td>${locale[patient.evacuation.transportation]}</td>
//                 <td>${locale[patient.evacuation.status]}</td>
//             </tr>
//           </table>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <br/><br/>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//             <h1>${locale.treatments}</h1>
//             <h2>${locale.treatments}</h2>
//             <table border="1">
//               <tr>
//                   <td>${locale.care_guide}</td>
//                   <td>${locale.order_time}</td>
//                   <td>${locale.execution_time}</td>

//               </tr>
//             ${patient.treatmentGuide.guides.map(
//               (guide) => ` <tr>
//                   <td>${guide.care_guide}</td>
//                   <td>${timeToDate(new Date(guide.order_time))}</td>
//                   <td>${timeToDate(new Date(guide.execution_time))}</td>
//               </tr>`
//             )}
//             </table>
//             <h2>${locale.measurements}</h2>
//             <label>${locale.period}: ${
//   patient.treatmentGuide.measurements.period
// }</label>
//             <table border="1">
//               <tr>
//                   <td>${locale.treatment_time}</td>
//                   <td>${locale.treatment_provider}</td>
//                   <td>${locale.treatment_puls}</td>
//                   <td>${locale.treatment_bloodPressure}</td>
//                   <td>${locale.treatment_breath}</td>
//                   <td>${locale.treatment_spo2}</td>
//                   <td>${locale.etcos}</td>
//                   <td>${locale.pain}</td>
//                   <td>${locale.prpo}</td>
//                   <td>${locale.GCS}</td>
//                   <td>${locale.urine}</td>
//                   <td>${locale.treatment_blood}</td>

//               </tr>
//             ${patient.treatmentGuide.measurements.actions.map(
//               (measurement) => {
//                 if (!measurement.provider) {
//                   return "";
//                 }
//                 return `<tr>
//                   <td>${timeToDate(new Date(measurement.time))}</td>
//                   <td>${measurement.provider?.full_name}, ${
//                   measurement.provider?.idf_id
//                 }, ${locale[measurement.provider?.role]}</td>
//                 <td>${measurement.puls}</td>
//                 <td>${measurement.bloodPressure}</td>
//                 <td>${measurement.breath}</td>
//                 <td>${measurement.spo2}</td>
//                 <td>${measurement.etcos}</td>
//                 <td>${measurement.pain}</td>
//                 <td>${measurement.prpo}</td>
//                 <td>${measurement.GCS}</td>
//                 <td>${measurement.urine}</td>
//                 <td>${measurement.blood}</td>
//               </tr>`;
//               }
//             )}
//             </table>
