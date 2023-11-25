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
  Sending: ({ patientsIds }: { patientsIds: string[] }) => ({
    text: "העברת פצועים",
    patientsIds,
  }),
});

export type NfcTransferStatus = VariantOf<typeof NfcTransferStatus>;
export type NfcStatus = VariantOf<typeof NfcStatus>;

// STORE

export const useNfcStore = create<{
  nfcStatus: NfcStatus;
  nfcTransferStatus: NfcTransferStatus;
  setTransferStatus(status: NfcTransferStatus): void;
  openNfcDialog(request: Exclude<NfcStatus, { type: "Idle" }>): void;
  closeNfcDialog(): void;
}>()(
  devtools((set) => ({
    nfcStatus: NfcStatus.Idle(),
    nfcTransferStatus: NfcTransferStatus.Waiting(),
    setTransferStatus(status) {
      set((state) => ({
        ...state,
        nfcTransferStatus: status,
      }));
    },
    openNfcDialog(request) {
      set((state) => ({
        ...state,
        nfcStatus: request,
      }));
    },
    closeNfcDialog() {
      set((state) => ({
        ...state,
        nfcStatus: NfcStatus.Idle(),
        nfcTransferStatus: NfcTransferStatus.Waiting(),
      }));
    },
  }))
);