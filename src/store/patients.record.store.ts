import _, { remove } from "lodash";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import storage, { STORAGE } from "../../storage";
import {
  EAirWayTreatment,
  EBreathingTreatment,
  ECconsciousness,
  EEnvironment,
  EEsectionChips,
  EInjuryReason,
  EMeasurementsTreatments,
  EPosition,
  EReactionEyes,
  EReactionGeneral,
  EReactionMovement,
  EReactionSpeech,
  ETransportation,
  E_InjuryType,
  IAction,
  IAirway,
  IBreathing,
  ICareProvider,
  IEvacuationInformation,
  IIncidentInformation,
  IInjury,
  IInjuryReason,
  IMeasurements,
  IMeasurementsAction,
  IMedicationsAndFluid,
  IMedicationsAndFluidInformation,
  IPatientRecord,
  IPersonalInformation,
  IReaction,
  ITreatment,
  ITreatmentGuide,
  STATUS,
} from "../interfaces";
import {
  toggleListData,
  updateDataInIndex,
} from "../views/homepage/tabs/report-tab/create-components/utils";
import { emptyPatient } from "../views/homepage/tabs/report-tab/empty-patient";

export const initialPatient = {
  incident_information: {
    injury_time: null,
    care_time: null,
    date: null,
  },

  id: null,
  prognosis: [],
  personal_information: {
    full_name: null,
    idf_id: null,
    patientId: null,
  },
  breathing: {
    fulfill: null,
    breathingCount: null,
    saturation: null,
    actions: [],
  },
  airway: {
    fulfill: null,
    actions: [],
  },
  consciousness: [],
  providers: [],
  eSection: [],
  injuries: [],
  measurements: {
    fulfill: null,
    bloodPressure: null,
    actions: [],
    shock: null,
    palpated: null,
    puls: null,
  },
  reaction: {
    general: [],
    eyes: null,
    speech: null,
    movement: null,
    GCS: 3,
  },
  medicationsAndFluids: { actions: [] },
  injuryReason: {
    reasons: [],
    circumstance: null,
  },
  evacuation: {
    time: null,
    destination: null,
    transportation: null,
    status: STATUS.NEW_PATIENT,
    special_care: null,
  },
  treatmentGuide: {
    guides: [],
    measurements: {
      period: null,
      actions: [],
    },
  },
  image: null,
};

export const usePatientRecordsStore = create<{
  patients: IPatientRecord[];
  activePatient: {
    incident_information: IIncidentInformation;
    id: string;
    personal_information: IPersonalInformation;
    providers: ICareProvider[];
    injuries: IInjury[];
    consciousness: ECconsciousness[];
    eSection: EEsectionChips[];
    airway: IAirway;
    breathing: IBreathing;
    measurements: IMeasurements;
    reaction: IReaction;
    medicationsAndFluids: IMedicationsAndFluid;
    injuryReason: IInjuryReason;
    prognosis: string[];
    evacuation: IEvacuationInformation;
    treatmentGuide: ITreatment;
    image: string;
  };
  injuriesImage: Record<string, string>;
  addInjuriesImage(image: string): void;
  deletePatients(): void;
  deletePatient(patientId): void;
  deletePatientsById(ids: string[]): void;
  updatePartialPatient(data: any): void;
  updatePrognosis(data: string): void;
  removePrognosis(index: number): void;
  loadPatientsState(): Promise<boolean>;
  updatePatientStatus(ids: string[], status: STATUS): Promise<void>;
  addPatient(data: IPatientRecord): Promise<void>;
  savePatient(): Promise<void>;
  setActivePatient(selectedPatient: IPatientRecord): void;
  treatmentGuide_handlers: {
    addGuide(guide: ITreatmentGuide): void;
    addMeasurementsAction(action: IMeasurementsAction): void;
    removeGuide(id: number): void;
    removeMeasurementAction(index: number): void;
    setPeriod(period: number): void;
    updateAtIndex(data: Partial<IMeasurementsAction>, index: number): void;
    updateGuideAtIndex(data: Partial<ITreatmentGuide>, index: number): void;
  };
  reaction_handlers: {
    setEyes(eyes: EReactionEyes): void;
    setSpeech(speech: EReactionSpeech): void;
    setMovement(movement: EReactionMovement): void;
    toggleGeneral(select: EReactionGeneral): void;
    setGCS(gcs: number): void;
  };
  provider_handlers: {
    addProvider(provider: ICareProvider): void;
  };
  medicationsAndFluids_handlers: {
    addAction(action: IMedicationsAndFluidInformation): void;
    removeAction(id: number): void;
    updateById(
      data: Partial<IMedicationsAndFluidInformation>,
      index: number
    ): void;
  };
  measurements_handlers: {
    toggleShock(shock: boolean): void;
    togglePalpated(palpated: boolean): void;
    setPuls(puls: number): void;
    setBloodPressure(bloodPressure: string): void;
    addAction(action: IAction<EMeasurementsTreatments>): void;
    removeAction(id: number): void;
    updateById(
      data: Partial<IAction<EMeasurementsTreatments>>,
      index: number
    ): void;
  };
  injuryReason_handlers: {
    toggleReason(reason: EInjuryReason): void;
    setCircumstance(circumstance: string): void;
  };
  injuries_handlers: {
    addInjury({
      xPos,
      yPos,
      data,
      id,
      location,
    }: {
      location?: EPosition;
      id: number;
      xPos: number;
      yPos: number;
      data: E_InjuryType;
    }): void;
    cleanInjuries(): void;
    removeInjury(id: number): void;
    setMainInjury(id: number): void;
    updateByIndex(data: Partial<IInjury>, index: number): void;
  };
  evacuation_handlers: {
    setTime(time: number): void;
    setDestination(destination: string): void;
    setTransportation(transportation: ETransportation): void;
    setSpecialCare(special_care: boolean): void;
    setStatus(status: STATUS): void;
  };
  esection_handlers: {
    toggleSelection(select: EEsectionChips): void;
  };
  breathing_handlers: {
    toggleFulfill(fulfill: boolean): void;
    setBreathingCount(count: number): void;
    setSaturation(count: number): void;
    addAction(action: IAction<EBreathingTreatment>): void;
    removeAction(id: number): void;
    updateById(data: Partial<IAction<EBreathingTreatment>>, id: number): void;
  };
  incident_information_handlers: {
    setTime(injury_time: number): void;
    setCareTime(care_time: number): void;
    setDate(date: number): void;
  };
  personal_information_handlers: {
    setUnit(unit: string): void;
    setEnvironment(environment: EEnvironment): void;
    setFullName(full_name: string): void;
    setIdf(idf_id: string): void;
    setPatientId(data: string): void;
  };
  airway_handlers: {
    toggleFulfill(fulfill: boolean): void;
    addAction(action: IAction<EAirWayTreatment>): void;
    removeAction(id: number): void;
    updateById(data: Partial<IAction<EAirWayTreatment>>, index: number): void;
  };
  consciousness_handlers: {
    toggleConsciousness(select: ECconsciousness): void;
  };
}>()(
  devtools((set, get, state) => ({
    injuriesImage: {},
    addInjuriesImage(image: string) {
      const current = state.getState();

      set((state) => ({
        ...state,
        activePatient: { ...current.activePatient, image },
      }));
    },
    async deletePatient(patientId) {
      const current = state.getState();
      const cleanPatients = current.patients.filter(
        (patient) => patient.personal_information.patientId !== patientId
      );
      await storage.save({
        key: STORAGE.PATIENTS_RECORD,
        data: { patients: cleanPatients },
      });
      set((state) => ({ ...state, patients: cleanPatients }));
    },
    async deletePatientsById(ids: string[]) {
      const current = state.getState();
      const keep = current.patients.filter(
        (p) => !ids.includes(p.personal_information.patientId)
      );

      await storage.save({
        key: STORAGE.PATIENTS_RECORD,
        data: { patients: keep },
      });

      set((state) => ({ ...state, patients: keep }));
    },
    async deletePatients() {
      const current = state.getState();

      current.patients.length !== 0 &&
        (await storage.remove({ key: STORAGE.PATIENTS_RECORD }));

      set((state) => ({ ...state, patients: [] }));
    },
    patients: [],
    activePatient: _.cloneDeep(initialPatient),
    updatePrognosis(prognosis: string) {
      const current = state.getState();
      current.updatePartialPatient({
        ...current.activePatient,
        prognosis: [...(current.activePatient.prognosis ?? []), prognosis],
      });
    },
    removePrognosis(index: number) {
      const current = state.getState();
      current.updatePartialPatient({
        ...current.activePatient,
        prognosis: current.activePatient.prognosis.filter(
          (a, item) => item !== index
        ),
      });
    },
    treatmentGuide_handlers: {
      addGuide(guide: ITreatmentGuide) {
        const current = state.getState();
        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            guides: [...current.activePatient.treatmentGuide.guides, guide],
          },
        });
      },
      removeGuide(id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            guides: current.activePatient.treatmentGuide.guides.filter(
              (item) => item.id !== id
            ),
          },
        });
      },
      addMeasurementsAction(action: IMeasurementsAction) {
        const current = state.getState();
        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            measurements: {
              ...current.activePatient.treatmentGuide.measurements,
              actions: [
                ...(current.activePatient.treatmentGuide.measurements.actions ??
                  []),
                action,
              ],
            },
          },
        });
      },
      setPeriod(period: number) {
        const current = state.getState();
        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            measurements: {
              ...current.activePatient.treatmentGuide.measurements,
              period,
            },
          },
        });
      },
      removeMeasurementAction(indexToRemove: number) {
        const current = state.getState();

        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            measurements: {
              ...current.activePatient.treatmentGuide.measurements,
              actions:
                current.activePatient.treatmentGuide.measurements.actions.filter(
                  (_, index) => index !== indexToRemove
                ),
            },
          },
        });
      },
      updateAtIndex(data: Partial<IMeasurementsAction>, index: number) {
        const current = state.getState();

        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            measurements: {
              ...current.activePatient.treatmentGuide.measurements,
              actions: [
                ...updateDataInIndex(
                  current.activePatient.treatmentGuide.measurements.actions,
                  data,
                  index
                ),
              ],
            },
          },
        });
      },
      updateGuideAtIndex(data: Partial<ITreatmentGuide>, index: number) {
        const current = state.getState();

        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            guides: [
              ...updateDataInIndex(
                current.activePatient.treatmentGuide.guides,
                data,
                index
              ),
            ],
          },
        });
      },
    },
    reaction_handlers: {
      toggleGeneral(select: EReactionGeneral) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            general: [
              ...toggleListData(
                [...current.activePatient.reaction.general],
                select
              ),
            ],
          },
        });
      },
      setEyes(eyes: EReactionEyes) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            eyes: current.activePatient.reaction.eyes === eyes ? null : eyes,
          },
        });
      },
      setMovement(movement: EReactionMovement) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            movement:
              current.activePatient.reaction.movement === movement
                ? null
                : movement,
          },
        });
      },
      setSpeech(speech: EReactionSpeech) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            speech:
              current.activePatient.reaction.speech === speech ? null : speech,
          },
        });
      },
      setGCS(GCS: number) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            GCS,
          },
        });
      },
    },
    provider_handlers: {
      addProvider(provider) {
        const current = state.getState();
        current.updatePartialPatient({
          providers: _.uniqBy(
            [...(current.activePatient.providers ?? []), provider],
            "idf_id"
          ),
        });
      },
    },
    medicationsAndFluids_handlers: {
      addAction(action: IMedicationsAndFluidInformation) {
        const current = state.getState();

        current.updatePartialPatient({
          medicationsAndFluids: {
            ...current.activePatient.medicationsAndFluids,
            actions: [
              ...current.activePatient.medicationsAndFluids.actions,
              action,
            ],
          },
        });
      },
      removeAction(id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          medicationsAndFluids: {
            ...current.activePatient.medicationsAndFluids,
            actions: current.activePatient.medicationsAndFluids.actions.filter(
              (a, index) => {
                return index !== id;
              }
            ),
          },
        });
      },
      updateById(
        data: Partial<IMedicationsAndFluidInformation>,
        index: number
      ) {
        const current = state.getState();

        current.updatePartialPatient({
          medicationsAndFluids: {
            ...current.activePatient.medicationsAndFluids,
            actions: [
              ...updateDataInIndex(
                current.activePatient.medicationsAndFluids.actions,
                data,
                index
              ),
            ],
          },
        });
      },
    },
    measurements_handlers: {
      toggleShock(shock: boolean) {
        const current = state.getState();
        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            shock,
          },
        });
      },
      togglePalpated(palpated: boolean) {
        const current = state.getState();
        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            palpated,
          },
        });
      },
      setPuls(puls: number) {
        const current = state.getState();
        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            puls,
          },
        });
      },
      setBloodPressure(bloodPressure: string) {
        const current = state.getState();
        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            bloodPressure,
          },
        });
      },

      addAction(action: IAction<EMeasurementsTreatments>) {
        const current = state.getState();

        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            actions: [...current.activePatient.measurements.actions, action],
          },
        });
      },
      updateById(data: Partial<IAction<EMeasurementsTreatments>>, id: number) {
        const current = state.getState();
        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            actions: current.activePatient.measurements.actions.map((action) =>
              action.id === id ? { ...action, ...data } : action
            ),
          },
        });
      },
      removeAction(id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            actions: current.activePatient.measurements.actions.filter(
              (item) => item.id !== id
            ),
          },
        });
      },
    },
    injuryReason_handlers: {
      toggleReason(reason: EInjuryReason) {
        const current = state.getState();

        current.updatePartialPatient({
          injuryReason: {
            ...current.activePatient.injuryReason,
            reasons: toggleListData(
              [...current.activePatient.injuryReason.reasons],
              reason
            ),
          },
        });
      },
      setCircumstance(circumstance: string) {
        const current = state.getState();

        current.updatePartialPatient({
          injuryReason: {
            ...current.activePatient.injuryReason,
            circumstance,
          },
        });
      },
    },
    injuries_handlers: {
      updateByIndex(data: Partial<IInjury>, index: number) {
        const current = state.getState();

        const isMain = current.activePatient.injuries.find(
          (injury) => injury.isMain
        );

        const canBeMain = [
          E_InjuryType.BURN,
          E_InjuryType.CUT,
          E_InjuryType.GUNSHOT,
          E_InjuryType.HIT,
        ].includes(data.data);
        data.isMain = canBeMain && !isMain;
        current.updatePartialPatient({
          injuries: updateDataInIndex(
            current.activePatient.injuries,
            data,
            index
          ),
        });
      },
      addInjury({ xPos, yPos, data, id, location }) {
        const current = state.getState();

        current.updatePartialPatient({
          injuries: [
            ...current.activePatient.injuries,
            {
              id,
              xPos,
              yPos,
              data,
              location,
              isMain: false,
            },
          ],
        });
      },
      cleanInjuries() {
        const current = state.getState();
        current.updatePartialPatient({
          injuries: [
            ...current.activePatient.injuries.filter((item) => item.data),
          ],
        });
      },
      removeInjury(id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          injuries: [
            ...current.activePatient.injuries.filter((item) => item.id !== id),
          ],
        });
      },
      setMainInjury(id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          injuries: current.activePatient.injuries.map((item) => {
            item.isMain = item.id === id;
            return item;
          }),
        });
      },
    },
    incident_information_handlers: {
      setTime(injury_time: number) {
        const current = state.getState();
        const merged = _.merge(current.activePatient.incident_information, {
          injury_time,
        });

        current.updatePartialPatient({
          incident_information: merged,
        });
      },
      setCareTime(care_time: number) {
        const current = state.getState();
        const merged = _.merge(current.activePatient.incident_information, {
          care_time,
        });

        current.updatePartialPatient({
          incident_information: merged,
        });
      },
      setDate(date: number) {
        const current = state.getState();
        const merged = _.merge(current.activePatient.incident_information, {
          date,
        });

        current.updatePartialPatient({
          incident_information: merged,
        });
      },
    },
    personal_information_handlers: {
      setEnvironment(environment: EEnvironment) {
        const current = state.getState();
        current.updatePartialPatient({
          personal_information: {
            ...current.activePatient.personal_information,
            environment,
          },
        });
      },
      setUnit(unit) {
        const current = state.getState();
        current.updatePartialPatient({
          personal_information: {
            ...current.activePatient.personal_information,
            unit,
          },
        });
      },
      setFullName(full_name: string) {
        const current = state.getState();
        current.updatePartialPatient({
          personal_information: {
            ...current.activePatient.personal_information,
            full_name,
          },
        });
      },

      setPatientId(patientId: string) {
        const current = state.getState();
        current.updatePartialPatient({
          personal_information: {
            ...current.activePatient.personal_information,
            patientId,
          },
        });
      },
      setIdf(idf_id: string) {
        const current = state.getState();

        current.updatePartialPatient({
          personal_information: {
            ...current.activePatient.personal_information,
            idf_id,
          },
        });
      },
    },
    airway_handlers: {
      toggleFulfill(fulfill: boolean) {
        const current = state.getState();
        const actions = fulfill ? current.activePatient.airway.actions : [];

        current.updatePartialPatient({
          airway: {
            ...current.activePatient.airway,
            fulfill,
            actions,
          },
        });
      },
      addAction(action: IAction<EAirWayTreatment>) {
        const current = state.getState();

        current.updatePartialPatient({
          airway: {
            ...current.activePatient.airway,
            actions: [...current.activePatient.airway.actions, action],
          },
        });
      },
      removeAction(id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          airway: {
            ...current.activePatient.airway,
            actions: current.activePatient.airway.actions.filter(
              (item) => item.id !== id
            ),
          },
        });
      },
      updateById(data: Partial<IAction<EAirWayTreatment>>, id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          airway: {
            ...current.activePatient.airway,
            actions: current.activePatient.airway.actions.map((action) =>
              action.id === id ? { ...action, ...data } : action
            ),
          },
        });
      },
    },
    breathing_handlers: {
      toggleFulfill(fulfill: boolean) {
        const current = state.getState();
        const actions = fulfill ? current.activePatient.breathing.actions : [];

        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            fulfill,
            actions,
          },
        });
      },
      setBreathingCount(breathingCount: number) {
        const current = state.getState();
        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            breathingCount,
          },
        });
      },
      setSaturation(saturation: number) {
        const current = state.getState();
        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            saturation,
          },
        });
      },
      addAction(action: IAction<EBreathingTreatment>) {
        const current = state.getState();

        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            actions: [...current.activePatient.breathing.actions, action],
          },
        });
      },
      removeAction(id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            actions: current.activePatient.breathing.actions.filter(
              (item) => item.id !== id
            ),
          },
        });
      },
      updateById(data: Partial<IAction<EBreathingTreatment>>, id: number) {
        const current = state.getState();

        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            actions: current.activePatient.breathing.actions.map((action) =>
              action.id === id ? { ...action, ...data } : action
            ),
          },
        });
      },
    },
    consciousness_handlers: {
      toggleConsciousness(select: ECconsciousness) {
        const current = state.getState();

        current.updatePartialPatient({
          consciousness:
            current.activePatient.consciousness[0] === select ? [] : [select],
        });
      },
    },
    esection_handlers: {
      toggleSelection(select: string) {
        const current = state.getState();
        current.updatePartialPatient({
          eSection: toggleListData([...current.activePatient.eSection], select),
        });
      },
    },
    evacuation_handlers: {
      setTime(time: number) {
        const current = state.getState();

        current.updatePartialPatient({
          evacuation: {
            ...current.activePatient.evacuation,
            time,
          },
        });
      },
      setSpecialCare(special_care: boolean) {
        const current = state.getState();

        current.updatePartialPatient({
          evacuation: {
            ...current.activePatient.evacuation,
            special_care,
          },
        });
      },

      setDestination(destination: string) {
        const current = state.getState();

        current.updatePartialPatient({
          evacuation: {
            ...current.activePatient.evacuation,
            destination,
          },
        });
      },

      setTransportation(transportation: ETransportation) {
        const current = state.getState();

        current.updatePartialPatient({
          evacuation: {
            ...current.activePatient.evacuation,
            transportation,
          },
        });
      },
      setStatus(status: STATUS) {
        const current = state.getState();

        current.updatePartialPatient({
          evacuation: {
            ...current.activePatient.evacuation,
            status,
          },
        });
      },
    },
    setActivePatient(selectedPatient: IPatientRecord = emptyPatient) {
      const patient = {
        ...selectedPatient,
      };
      set((state) => ({ ...state, activePatient: { ...patient } as any }));
    },
    async savePatient() {
      const active = get().activePatient;

      const patients = get().patients;

      const final: IPatientRecord = {
        personal_information: undefined,
        incident_information: undefined,
        providers: [],
        injuries: [],
        consciousness: [],
        eSection: [],
        airway: undefined,
        breathing: undefined,
        measurements: undefined,
        reaction: undefined,
        medicationsAndFluids: undefined,
        injuryReason: undefined,
        prognosis: [],
        evacuation: undefined,
        treatmentGuide: undefined,
        image: undefined,
      };

      for (const key in final) {
        if (_.isArray(active[key]) || _.isString(active[key])) {
          final[key] = active[key];
        } else {
          final[key] = _.omitBy(active[key], _.isNil);
        }
      }
      const updateById = patients.findIndex((p) => {
        return (
          p.personal_information.patientId ===
          final.personal_information.patientId
        );
      });
      final.new = false;

      if (updateById === -1) {
        patients.push(final);
      } else {
        patients[updateById] = final;
      }

      await storage.save({
        key: STORAGE.PATIENTS_RECORD,
        data: { patients },
      });
      set((state) => ({
        ...state,
        patients: [...patients],
        activePatient: _.cloneDeep(initialPatient),
      }));
    },
    updatePartialPatient(data) {
      set((state) => {
        return {
          ...state,
          activePatient: { ...state.activePatient, ...data },
        };
      });
    },
    setPatient(data) {
      set((state) => ({
        ...state,
        activePatient: { ...data },
      }));
    },
    async loadPatientsState() {
      try {
        const { patients } = await storage.load({
          key: STORAGE.PATIENTS_RECORD,
        });

        set((state) => {
          if (patients) {
            return {
              ...state,
              patients,
            };
          }
        });
        return Boolean(patients);
      } catch (e) {
        return false;
      }
    },
    async updatePatientStatus(ids: string[], status: STATUS) {
      const currentData = get().patients;
      const updated = currentData.map((patient) => {
        if (ids.includes(patient.personal_information.patientId)) {
          patient.evacuation.status = status;
        }
        return patient;
      });

      await storage.save({
        key: STORAGE.PATIENTS_RECORD,
        data: { patients: updated },
      });
      set((state) => ({ ...state, patients: updated }));
    },
    async addPatient(newPatient: IPatientRecord) {
      const currentData = get().patients;
      const currentIndex = currentData.findIndex((patient) => {
        return (
          patient.personal_information.patientId ===
          newPatient.personal_information.patientId
        );
      });
      if (currentIndex === -1) {
        currentData.push(newPatient);
      } else {
        currentData[currentIndex] = newPatient;
      }

      await storage.save({
        key: STORAGE.PATIENTS_RECORD,
        data: { patients: currentData },
      });
      set((state) => ({ ...state, patients: currentData }));
    },
  }))
);
