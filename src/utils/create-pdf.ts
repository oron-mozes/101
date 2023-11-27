import { printToFileAsync } from "expo-print";
import locale from "../../locales/he.json";
import { ICareProvider, IPatientRecord } from "../interfaces";
import { colors } from "../shared-config";
import {
  returnAirwayTable,
  returnBodyPicker,
  returnBreathingTable,
  returnCareProviderTable,
  returnConsciousnessTable,
  returnESectionTable,
  returnGuidelinesTable,
  returnInfoTable,
  returnInjuryReasonsTable,
  returnMeasurementsInformationTable,
  returnMeasurementsTable,
  returnMedicationTable,
  returnPrognosisTable,
} from "./helpers";

export const createPDFWithImage = async (patient: IPatientRecord) => {
  const mainInjury = patient.injuries.find((injury) => injury.isMain);
  const mainInjuryName =
    mainInjury &&
    `${locale[mainInjury?.data?.toLowerCase() ?? ""]} ${
      locale[mainInjury?.location ?? ""]
    }`;

  const htmlContent = `
          <html dir="rtl">
            <body>
            <header style="height: 58px; padding:14px 32.5px; margin-bottom: 20px; background: ${
              colors.primary
            }; display: flex; justify-content: space-between; flex-direction: row-reverse; align-items:center">
            <svg width="58" height="39" viewBox="0 0 58 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 0V4H57.5V0H0.5Z" fill="white"/>
            <path d="M4.18791 12.5002C3.5636 12.4927 2.97561 12.4856 2.38935 12.5081C1.79498 12.5322 1.56684 12.3052 1.52081 11.7085C1.40474 9.86029 3.08378 8 4.92293 8H12.4816V24.5136H5.2011V12.5081C4.85017 12.5081 4.51408 12.5041 4.18791 12.5002Z" fill="white"/>
            <path d="M37.7162 10.7363C38.1065 11.1094 38.4973 11.483 38.85 11.8873C39.1846 12.2754 39.3829 12.7632 39.4143 13.2755C39.4427 15.5844 39.4429 17.894 39.4432 20.2039C39.4433 21.6399 39.4434 23.0775 39.4503 24.5136C39.4673 24.8782 39.3996 25.2419 39.2527 25.5759C39.1058 25.9098 38.8837 26.205 38.6038 26.4381C37.8546 27.0513 37.1688 27.7384 36.5565 28.4893C35.6059 29.7429 34.4312 30.0824 32.9143 29.99C31.5083 29.9046 30.0966 29.9235 28.6506 29.9429C28.0201 29.9513 27.3823 29.9598 26.7364 29.9598V25.5542H32.0958V8.07634C32.3753 8.07306 32.6522 8.0557 32.9248 8.03859C34.1546 7.96143 35.2988 7.88966 36.2243 9.14109C36.6557 9.72231 37.1854 10.2288 37.7162 10.7363Z" fill="white"/>
            <path d="M30.3108 12.488C30.9112 12.5041 31.1453 12.2871 31.1233 11.6844C31.0913 10.7161 31.0973 9.74377 31.1233 8.77545C31.1393 8.20089 30.9072 8.01004 30.3528 8.01406C29.3497 8.02172 28.3469 8.02037 27.3444 8.01901C25.9808 8.01717 24.6175 8.01532 23.2544 8.03616C22.8696 8.06635 22.5064 8.22637 22.2237 8.49018C21.039 9.60716 19.8763 10.7683 18.7576 11.9596C18.4833 12.2768 18.3257 12.6789 18.3113 13.0987C18.282 17.0121 18.2886 20.9262 18.3313 24.841C18.3535 25.2928 18.527 25.7239 18.8236 26.0645C19.8943 27.2162 21.021 28.3157 22.1506 29.418L22.2137 29.4797C22.4347 29.7191 22.7254 29.8822 23.0443 29.9458C23.6286 29.99 24.216 29.9825 24.848 29.9745C25.1056 29.9712 25.3706 29.9679 25.6459 29.9679V28.3969C25.6459 26.7472 25.6485 25.0965 25.6512 23.4465C25.6566 20.1458 25.6619 16.8448 25.6459 13.5447C25.6459 12.721 25.88 12.4257 26.7205 12.4719C27.367 12.5036 28.0175 12.4949 28.6693 12.4862C29.2161 12.4788 29.7639 12.4715 30.3108 12.488Z" fill="white"/>
            <path d="M42.8746 12.4779C43.4887 12.4445 44.1047 12.4517 44.7494 12.4592C45.0332 12.4625 45.3231 12.4659 45.6203 12.4659V13.7074C45.6203 14.8 45.6236 15.8926 45.627 16.9854V16.9864C45.6336 19.1727 45.6403 21.3603 45.6203 23.5513C45.6203 24.3127 45.8204 24.618 46.6209 24.5919C47.8052 24.5549 48.9895 24.5596 50.1738 24.5643C50.7907 24.5668 51.4075 24.5692 52.0243 24.5658C52.2147 24.5658 52.4042 24.5405 52.6018 24.5142C52.699 24.5013 52.7986 24.488 52.9008 24.4774V8.08437C52.7597 8.0779 52.6263 8.07059 52.4987 8.0636C52.23 8.04887 51.9862 8.03551 51.7461 8.03415H45.4482C43.573 8.03415 41.97 9.68952 41.962 11.5518C41.966 12.2409 42.1682 12.5141 42.8746 12.4779Z" fill="white"/>
            <path d="M42.086 29.8855V25.5964H56.485V29.8855H42.086Z" fill="white"/>
            <path d="M16.0618 29.8975H1.65279V25.5602H16.0618V29.8975Z" fill="white"/>
            <path d="M0.5 38.0042V34.0042H57.5V38.0042H0.5Z" fill="white"/>
            </svg>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA7CAYAAAAn+enKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABQBSURBVHgB5ZsHlFVFEob7DjlLkBxGECQrOShBBCSDAiqiogQVQTEAK7LCsogkkaBgYEVBQdLAiEMSUZKCCIjknJMwCEgO83q/v5nHGWZn5r5xAfecrXPeefMu93Z3dVX99Vf1xZi/QKpWrVo+bdq04eb/RMIiIiK2fvzxxzPNXyCeuUXy+uuv//Pee+/NevTo0ZwZM2Zs7SHr16//onz58idnzJix8/PPPx9hboGEmZsgnTt3bli2bNm74l77A9m3b1/XkydPNo6MjHxz+vTpQ+688862v//+e9fffvttXdx7w5FWrVo9bG6CQW7ogLch77777tgKFSq0qlSpUpmnn366RunSpStj0YJZs2a9fc+ePWW2bds2+YMPPmij+4cNG7b8zJkzlapUqbJ+9+7dp7Zu3XosV65cs998881dK1euXHTw4MEZTZs27catB80Nkhtp4ZzvvffekocffrgVi7/Agn9t3rz5mMuXL7dj0XWioqIKpkqVypYpU6ZBwYIF62LdJ1C2cu7cuQNY+xz31mJjWpUsWfLT7du3z/v5559jqlev3nLq1KnLGDvc3CC5EQoXat269UBicHn69OnLHDt2zJw/fz7tCy+8EPbrr7+a559/3vvqq6/eRZmJRYsWjULJraNGjVowfPjwCSi/DMXnZciQIRKrjn3ttdfMqlWrDO6cLlu2bClOnTpluL/QvHnzZjds2HBAjRo18pi/UnDFXJMnT97y7bffBlioHThwoP3www9toUKF7FtvvRVYu3at7dSp0yBzfehknjJlyvZJkyYtiT/eI488MgjLapxAkSJFAiC5HTlypP3+++/tF198IU/YZv5La/83MRw2duzYVU8++WS5H374wb799tvel19+aXr37m1atmxpKleubBYsWGCw8vy8efPuiftgihQpyu/fv/8M7rwj7vUTJ07kwI1b8Ky3YsUKi4LeSy+95Mbs3r27vfvuu72FCxeuJmyqcftl8yfkTyv86quvDn722Wd7AL4e1rK4pffoo48a4teEhYWZfPnyRWOZsDp16mQNZbzNmzebESNGKBwGfPbZZx1A9NyBQMAD7c2c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" width="59" height="59"/>

            </header>
            <main style="width: 740px; margin: 0 auto">
           
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

            ${returnBodyPicker(patient.injuries, mainInjuryName)}
            ${returnConsciousnessTable(patient.consciousness)}
            ${returnAirwayTable(patient.airway)}
            ${returnBreathingTable(patient.breathing)}
            ${returnMeasurementsTable(patient.measurements)}
            ${returnInfoTable(locale.dSection, [
              {
                ...patient.reaction,
              },
            ])}
            ${returnESectionTable(patient.eSection)}
            ${returnMedicationTable(patient.medicationsAndFluids)}
                      ${returnPrognosisTable(patient.prognosis)}
            ${returnCareProviderTable(patient.providers as ICareProvider[])}
            ${returnInfoTable(locale.evacuate, [
              {
                ...patient.evacuation,
              },
            ])}
            ${returnGuidelinesTable(patient.treatmentGuide.guides)}
            ${returnMeasurementsInformationTable(
              patient.treatmentGuide.measurements
            )}
        </main>
      </body>
    </html>
  `;

  const file = await printToFileAsync({ html: htmlContent, base64: true });

  return file.base64;
  // await shareAsync(file.uri, {
  //   mimeType: "application/pdf",
  //   dialogTitle: `${patient.personal_information.patientId} 101`,
  //   UTI: "com.microsoft.excel.xlsx",
  // });
};
