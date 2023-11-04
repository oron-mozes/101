import { ITaagad, ICareProvider } from "../interfaces";
import _ from "lodash";
import storage, { STORAGE } from "../../storage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTaggadStore = create<{
  taggad: ITaagad;
  loadInitialState(): Promise<boolean>;
  addProvider(data: ICareProvider): Promise<void>;
  removeProvider(providerId: number): Promise<void>;
  updateTaagadName(name: string): Promise<void>;
}>()(
  devtools((set, get) => ({
    taggad: {
      unit_name: null,
      care_providers: {},
    },
    async loadInitialState() {
      try {
        const initialData = await storage.load({
          key: STORAGE.TAAGAD,
        });
        set((state) => {
          if (initialData) {
            return {
              ...state,
              taggad: { ...state.taggad, ..._.omitBy(initialData, _.isNil) },
            };
          }
        });
        return Boolean(initialData);
      } catch (e) {
        return false;
      }
    },
    async addProvider(newCareProvider: ICareProvider) {
      console.log({ newCareProvider });
      const currentData = get().taggad;
      currentData.care_providers = {
        ...currentData.care_providers,
        [newCareProvider.idf_id]: newCareProvider,
      };
      await storage.save({ key: STORAGE.TAAGAD, data: currentData });
      set((state) => ({ ...state, taggad: currentData }));
    },
    async removeProvider(provideId: number) {
      const currentData = get().taggad;
      delete currentData.care_providers[provideId];

      await storage.save({ key: STORAGE.TAAGAD, data: currentData });
      set((state) => ({ ...state, taggad: currentData }));
    },
    async updateTaagadName(name: string) {
      const currentData = get().taggad;
      currentData.unit_name = name;
      await storage.save({ key: STORAGE.TAAGAD, data: currentData });
      set((state) => ({ ...state, taggad: currentData }));
    },
  }))
);
