import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useIncidentInformationStore = create<{
  date: number;
  setDate(date: number): void;
}>()(
  devtools((set) => ({
    date: null,
    setDate(date) {
      set((state) => ({
        ...state,
        date,
      }));
    },
  }))
);
