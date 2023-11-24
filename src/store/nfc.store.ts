import _ from "lodash";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  variant,
  fields,
  constant,
  type VariantOf,
} from 'variant';

const NfcTransferStatus = variant({
  Waiting: constant({ color: "#006BE5" }),
  Loading: constant({ color: "#006BE5" }),
  Success: ({ result }: { result: string }) => ({ color: "#14B881", result }),
  Error: ({ errorMessage }: { errorMessage: string }) => ({ color: "#CC1100", errorMessage }),
})

type NfcTransferStatus = VariantOf<typeof NfcTransferStatus>;

export const NfcStatus = variant({
  Idle: {},
  Receiving: {},
  Sending: fields<{ patients: string[] }>(),
})

export type NfcStatus = VariantOf<typeof NfcStatus>;

export const useNfcStore = create<{
  nfcStatus: NfcStatus;
  nfcTransferStatus: NfcTransferStatus;
  openNfcDialog(request: NfcStatus): void;
  closeNfcDialog(): void;
}>()(
  devtools((set) => ({
    nfcStatus: NfcStatus.Idle(),
    nfcTransferStatus: NfcTransferStatus.Waiting(),
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
