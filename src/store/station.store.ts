import { IStation, ICareProvider, CommunicationMethod } from "../interfaces";
import _ from "lodash";
import storage, { STORAGE } from "../../storage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStationStore = create<{
  station: IStation;
  loadInitialState(): Promise<boolean>;
  addProviders(data: ICareProvider[]): Promise<void>;
  updateStationName(name: string): Promise<void>;
  updateStationId(id: number): Promise<void>;
  hardStationReset(): Promise<void>;
  setAsYakar(isYakar: boolean): Promise<void>;
  setCommunicationMethod(method: CommunicationMethod): void;
  setIsSet(isSet: boolean): void;
  setStationDetails(station: IStation): void;
}>()(
  devtools((set, get) => ({
    setStationDetails: async (station) => {
      const currentData = get().station;
      currentData.unit_name = station.unit_name;
      currentData.care_providers = station.care_providers;
      currentData.isYakar = station.isYakar;
      currentData.communicationMethod = station.communicationMethod;
      currentData.unit_id = station.unit_id;
      currentData.is_set = station.is_set;
      currentData.API = station.API;
      currentData.TOKEN = station.TOKEN;
      currentData.email_to = station.email_to;

      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
    station: {
      is_set: false,
      unit_id: null,
      unit_name: null,
      care_providers: [],
      isYakar: null,
      communicationMethod: "NFC",
      API: null,
      email_to: null,
      TOKEN: null,
    },
    setIsSet: async (isSet) => {
      const currentData = get().station;
      currentData.is_set = isSet;
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
    setCommunicationMethod: async (method) => {
      const currentData = get().station;
      currentData.communicationMethod = method;
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
    updateStationId: async (id) => {
      const currentData = get().station;
      currentData.unit_id = id;
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
    setAsYakar: async (isYakar) => {
      const currentData = get().station;
      currentData.isYakar = isYakar;
      await storage.save({ key: STORAGE.STATION, data: currentData });
      set((state) => ({ ...state, station: currentData }));
    },
    async hardStationReset() {
      await storage.clearMapForKey(STORAGE.STATION);
      set((state) => ({
        ...state,
        station: {
          ...state.station,
          unit_id: null,
          unit_name: null,
          care_providers: [],
          communicationMethod: "NFC",
        },
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
