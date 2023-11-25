import { IStation, ICareProvider } from "../interfaces";
import _ from "lodash";
import storage, { STORAGE } from "../../storage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStationStore = create<{
  station: IStation;
  loadInitialState(): Promise<boolean>;
  addProviders(data: ICareProvider[]): Promise<void>;
  updateStationName(name: string): Promise<void>;
  hardStationReset(): Promise<void>;
  setAsYakar(isYakar: boolean): Promise<void>;
}>()(
  devtools((set, get) => ({
    setAsYakar: async (isYakar) => {
      const currentData = get().station;
      currentData.isYakar = isYakar;
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
    station: {
      unit_name: null,
      care_providers: [],
      isYakar: false,
    },
    async hardStationReset() {
      await storage.clearMapForKey(STORAGE.STATION);
      set((state) => ({
        ...state,
        station: { unit_name: null, care_providers: [], isYakar: false },
      }));
    },
    async loadInitialState() {
      try {
        const initialData = await storage.load({
          key: STORAGE.STATION,
        });
        set((state) => {
          if (initialData) {
            return {
              ...state,
              station: { ...state.station, ..._.omitBy(initialData, _.isNil) },
            };
          }
        });
        return Boolean(initialData);
      } catch (e) {
        return false;
      }
    },
    async addProviders(newCareProvider: ICareProvider[]) {
      const currentData = get().station;
      currentData.care_providers = newCareProvider;
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },

    async updateStationName(name: string) {
      const currentData = get().station;
      currentData.unit_name = name;
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
  }))
);
