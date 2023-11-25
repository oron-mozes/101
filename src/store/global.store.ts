import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { variant, constant, type VariantOf } from "variant";

// TYPES

export const NfcTransferStatus = variant({
  Waiting: constant({
    color: "#00244D",
    statusText: "בהמתנה",
    text: "נא להצמיד את המכשירים להתחלת הפעולה",
  }),
  Loading: constant({
    color: "#006BE5",
    statusText: "פעילה",
    text: "יש להחזיק את המכשירים קרוב ולא לנתק עד לסיום",
  }),
  Success: ({ result }: { result: string }) => ({
    color: "#14B881",
    statusText: "הושלמה בהצלחה",
    text: "ניתן לנתק מכשירים",
    result,
  }),
  Error: ({ errorMessage }: { errorMessage: string }) => ({
    color: "#CC1100",
    statusText: "נכשלה",
    text: "יש לנסות העברה מחדש",
    errorMessage,
  }),
});

export const NfcStatus = variant({
  Idle: {},
  Receiving: constant({ text: "קליטת פצועים" }),
  Sending: () => ({ text: "העברת פצועים" }),
});

export type NfcTransferStatus = VariantOf<typeof NfcTransferStatus>;
export type NfcStatus = VariantOf<typeof NfcStatus>;

// STORE

export const useGlobalStore = create<{
  performActionForPatients: string[];
  setPerformActionForPatients(ids: string[]): void;
  togglePatientId(id: string): void;
}>()(
  devtools((set) => ({
    performActionForPatients: [],
    setPerformActionForPatients(ids) {
      set((state) => ({
        ...state,
        performActionForPatients: ids,
      }));
    },
    togglePatientId(id) {
      set((state) => ({
        ...state,
        performActionForPatients: state.performActionForPatients.includes(id)
          ? state.performActionForPatients.filter(
              (patientId) => patientId !== id
            )
          : [...state.performActionForPatients, id],
      }));
    },
  }))
);
