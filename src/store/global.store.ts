import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useGlobalStore = create<{
  performActionForPatients: string[];
  setPerformActionForPatients(ids: string[]): void;
  togglePatientId(id: string): void;
  deleteBulkPatients: boolean;
  toggleDeleteBulkPatients(): void;
}>()(
  devtools((set) => ({
    deleteBulkPatients: false,
    toggleDeleteBulkPatients() {
      set((state) => ({
        ...state,
        deleteBulkPatients: !state.deleteBulkPatients,
      }));
    },
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
