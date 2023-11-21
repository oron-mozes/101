import { IStation, ICareProvider } from "../interfaces";
import _ from "lodash";
import storage, { STORAGE } from "../../storage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStationStore = create<{
  station: IStation;
  loadInitialState(): Promise<boolean>;
  addProvider(data: ICareProvider): Promise<void>;
  removeProvider(providerId: number): Promise<void>;
  updateStationName(name: string): Promise<void>;
  hardStationReset(): Promise<void>;
}>()(
  devtools((set, get) => ({
    station: {
      unit_name: null,
      care_providers: [],
    },
    async hardStationReset() {
      await storage.clearMapForKey(STORAGE.STATION);
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
    async addProvider(newCareProvider: ICareProvider) {
      const currentData = get().station;
      currentData.care_providers = {
        ...currentData.care_providers,
        [newCareProvider.idf_id]: newCareProvider,
      };
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
    async removeProvider(provideId: number) {
      const currentData = get().station;
      delete currentData.care_providers[provideId];

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
