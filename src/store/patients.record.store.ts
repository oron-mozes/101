import _ from "lodash";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import storage, { STORAGE } from "../../storage";
import { IPatientRecord } from "../interfaces";
import { emptyPatient } from "../views/homepage/tabs/report-tab";

export const usePatientRecordsStore = create<{
  patients: IPatientRecord[];
  loadPatientsState(): Promise<boolean>;
  addPatient(data: IPatientRecord): Promise<void>;
}>()(
  devtools((set, get) => ({
    patients: [],
    async loadPatientsState() {
      try {
        const initialData = await storage.load({
          key: STORAGE.PATIENTS_RECORD,
        });
        set((state) => {
          if (initialData) {
            return {
              ...state,
              patients: {
                ...state.patients,
                ..._.omitBy(initialData, _.isNil),
              },
            };
          }
        });
        return Boolean(initialData);
      } catch (e) {
        return false;
      }
    },
    async addPatient(newPatient: IPatientRecord) {
      const currentData = get().patients;
      currentData.push(newPatient);
      await storage.save({ key: STORAGE.PATIENTS_RECORD, data: currentData });
      set((state) => ({ ...state, patients: currentData }));
    },
  }))
);
