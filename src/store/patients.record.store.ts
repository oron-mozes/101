import _ from "lodash";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import storage, { STORAGE } from "../../storage";
import {
  ECconsciousness,
  EEsectionChips,
  EInjuryReason,
  EReactionEyes,
  EReactionGeneral,
  EReactionMovement,
  EReactionSpeech,
  ETransportation,
  IAirWayInformation,
  IAirway,
  IBreathing,
  IBreathingInformation,
  ICareProvider,
  IEvacuationInformation,
  IIncidentInformation,
  IInjury,
  IInjuryInformation,
  IInjuryReason,
  IMeasurements,
  IMeasurementsAction,
  IMeasurementsInformation,
  IMedicationsAndFluid,
  IMedicationsAndFluidInformation,
  IPatientRecord,
  IPersonalInformation,
  IReaction,
  ITreatment,
  ITreatmentGuide,
  STATUS,
} from "../interfaces";
import { emptyPatient } from "../views/homepage/tabs/report-tab";
import {
  toggleListData,
  updateDataInIndex,
} from "../views/homepage/tabs/report-tab/create-components/utils";

const initialPatient = {
  incident_information: {
    injury_time: null,
    care_time: null,
    date: null,
  },
  disabled: false,
  id: null,
  personal_information: {
    full_name: null,
    idf_id: null,
    patientId: null,
  },
  breathing: {
    fulfill: false,
    breathingCount: null,
    saturation: null,
    actions: [],
  },
  airway: {
    fulfill: false,
    actions: [],
  },
  consciousness: [],
  provider: {
    full_name: null,
    id: null,
    idf_id: null,
    rank: null,
    unit_name: null,
    role: null,
  },
  eSection: [],
  injuries: [],
  measurements: {
    fulfill: false,
    bloodPressure: null,
    actions: [],
    shock: null,
    palpated: null,
    puls: null,
  },
  reaction: {
    general: [],
    eyes: EReactionEyes.NONE,
    speech: EReactionSpeech.NONE,
    movement: EReactionMovement.NONE,
    GCS: 3,
  },
  medicationsAndFluids: { actions: [] },
  injuryReason: {
    reasons: [],
    circumstance: null,
  },
  prognosis: null,
  evacuation: {
    time: null,
    destination: null,
    transportation: null,
    status: null,
    special_care: null,
  },
  treatmentGuide: {
    guides: [],
    measurements: {
      period: null,
      actions: [],
    },
  },
};

export const usePatientRecordsStore = create<{
  patients: IPatientRecord[];
  activePatient: {
    incident_information: IIncidentInformation;
    disabled: boolean;
    id: string;
    personal_information: IPersonalInformation;
    provider: ICareProvider;
    injuries: IInjury[];
    consciousness: ECconsciousness[];
    eSection: EEsectionChips[];
    airway: IAirway;
    breathing: IBreathing;
    measurements: IMeasurements;
    reaction: IReaction;
    medicationsAndFluids: IMedicationsAndFluid;
    injuryReason: IInjuryReason;
    prognosis: string;
    evacuation: IEvacuationInformation;
    treatmentGuide: ITreatment;
  };
  updatePartialPatient(data: any): void;
  updatePrognosis(data: any): void;
  loadPatientsState(): Promise<boolean>;
  addPatient(data: IPatientRecord): Promise<void>;
  savePatient(): Promise<void>;
  setActivePatient(selectedPatient: IPatientRecord): void;
  treatmentGuide_handlers: {
    addGuide(guide: ITreatmentGuide): void;
    addMeasurementsAction(action: IMeasurementsAction): void;
    removeGuide(id: number): void;
    removeMeasurementAction(id: number): void;
    setPeriod(period: number): void;
    updateAtIndex(data: Partial<IMeasurementsAction>, index: number): void;
    updateGuideAtIndex(data: Partial<ITreatmentGuide>, index: number): void;
    setInitial(data: ITreatment): void;
  };
  reaction_handlers: {
    setEyes(eyes: EReactionEyes): void;
    setSpeech(speech: EReactionSpeech): void;
    setMovement(movement: EReactionMovement): void;
    toggleGeneral(select: EReactionGeneral): void;
    setGCS(gcs: number): void;
    setInitial(data: IReaction): void;
  };
  provider_handlers: {
    addProvider(provider: ICareProvider): void;
    setInitial(data: ICareProvider): void;
  };
  medicationsAndFluids_handlers: {
    addAction(action: IMedicationsAndFluidInformation): void;
    removeAction(id: number): void;
    updateAtIndex(
      data: Partial<IMedicationsAndFluidInformation>,
      index: number
    ): void;
    setInitial(data: IMedicationsAndFluid): void;
  };
  measurements_handlers: {
    toggleFulfill(fulfill: boolean): void;
    toggleShock(shock: boolean): void;
    togglePalpated(palpated: boolean): void;
    setPuls(puls: number): void;
    setBloodPressure(bloodPressure: string): void;
    addAction(action: IMeasurementsInformation): void;
    removeAction(id: number): void;
    updateAtIndex(data: Partial<IMeasurementsInformation>, index: number): void;
    setInitial(data: IMeasurements): void;
  };
  injuryReason_handlers: {
    toggleReason(reason: EInjuryReason): void;
    setCircumstance(circumstance: string): void;
    setInitial(data: IInjuryReason): void;
  };
  injuries_handlers: {
    addInjury({
      xPos,
      yPos,
      data,
      id,
    }: {
      id: number;
      xPos: number;
      yPos: number;
      data: IInjuryInformation;
    }): void;
    removeInjury(id: number): void;
    updateAtIndex(data: Partial<IInjury>, index: number): void;
    setInitial(data: IInjury[]): void;
  };
  evacuation_handlers: {
    setTime(time: number): void;
    setDestination(destination: string): void;
    setTransportation(transportation: ETransportation): void;
    setSpecialCare(special_care: boolean): void;
    setStatus(status: STATUS): void;
    setInitial(data: IEvacuationInformation): void;
  };
  esection_handlers: {
    toggleSelection(select: EEsectionChips): void;
    setInitial(data: EEsectionChips[]): void;
  };
  breathing_handlers: {
    toggleFulfill(fulfill: boolean): void;
    setBreathingCount(count: number): void;
    setSaturation(count: number): void;
    addAction(action: IBreathingInformation): void;
    removeAction(id: number): void;
    updateAtIndex(data: Partial<IBreathingInformation>, index: number): void;
    setInitial(date: IBreathing): void;
  };
  incident_information_handlers: {
    setTime(injury_time: number): void;
    setCareTime(care_time: number): void;
    setDate(date: number): void;
    setInitial(data: IIncidentInformation): void;
  };
  personal_information_handlers: {
    setFullName(full_name: string): void;
    setIdf(idf_id: number): void;
    setInitial(data: IPersonalInformation): void;
    setPatientId(data: string): void;
  };
  airway_handlers: {
    toggleFulfill(fulfill: boolean): void;
    addAction(action: IAirWayInformation): void;
    removeAction(id: number): void;
    updateAtIndex(data: Partial<IAirWayInformation>, index: number): void;
    setInitial(data: IAirway): void;
  };
  consciousness_handlers: {
    toggleConsciousness(select: ECconsciousness): void;
    setInitial(data: ECconsciousness[]): void;
  };
}>()(
  devtools((set, get, state) => ({
    patients: [],
    activePatient: { ...initialPatient },
    updatePrognosis(prognosis: string) {
      const current = state.getState();
      current.updatePartialPatient({
        ...current.activePatient,
        prognosis,
      });
    },
    treatmentGuide_handlers: {
      setInitial(data: ITreatment) {
        const current = state.getState();
        // current.updatePartialPatient({
        //   treatmentGuide: { ...current.activePatient.treatmentGuide, ...data },
        // });
      },
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
      removeMeasurementAction(id: number) {
        const current = state.getState();
        current.updatePartialPatient({
          treatmentGuide: {
            ...current.activePatient.treatmentGuide,
            measurements:
              current.activePatient.treatmentGuide.measurements.actions.filter(
                (item) => item.id !== id
              ),
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
      setInitial(data: IReaction) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: { ...current.activePatient.reaction, ...data },
        });
      },
      toggleGeneral(select: EReactionGeneral) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            general: toggleListData(
              current.activePatient.reaction.general,
              select
            ),
          },
        });
      },
      setEyes(eyes: EReactionEyes) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            eyes,
          },
        });
      },
      setMovement(movement: EReactionMovement) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            movement,
          },
        });
      },
      setSpeech(speech: EReactionSpeech) {
        const current = state.getState();
        current.updatePartialPatient({
          reaction: {
            ...current.activePatient.reaction,
            speech,
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
      setInitial(data: ICareProvider) {
        const current = state.getState();
        current.updatePartialPatient({
          provider: { ...current.activePatient.provider, ...data },
        });
      },
      addProvider(provider) {
        const current = state.getState();

        current.updatePartialPatient({
          provider: {
            ...current.activePatient.provider,
            ...provider,
          },
        });
      },
    },
    medicationsAndFluids_handlers: {
      setInitial(data: IMedicationsAndFluid) {
        const current = state.getState();
        current.updatePartialPatient({
          medicationsAndFluids: {
            ...current.activePatient.medicationsAndFluids,
            ...data,
          },
        });
      },
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
              (item) => {
                return item.id !== id;
              }
            ),
          },
        });
      },
      updateAtIndex(
        data: Partial<IMedicationsAndFluidInformation>,
        index: number
      ) {
        const current = state.getState();

        current.updatePartialPatient({
          medicationsAndFluids: {
            ...current.activePatient.medicationsAndFluids,
            actions: updateDataInIndex(
              current.activePatient.medicationsAndFluids.actions,
              data,
              index
            ),
          },
        });
      },
    },
    measurements_handlers: {
      setInitial(data: IMeasurements) {
        const current = state.getState();
        current.updatePartialPatient({
          measurements: { ...current.activePatient.measurements, ...data },
        });
      },
      toggleFulfill(fulfill: boolean) {
        const current = state.getState();
        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            fulfill,
          },
        });
      },
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

      addAction(action: IMeasurementsInformation) {
        const current = state.getState();

        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            actions: [...current.activePatient.measurements.actions, action],
          },
        });
      },
      updateAtIndex(data: Partial<IMeasurementsInformation>, index: number) {
        const current = state.getState();

        current.updatePartialPatient({
          measurements: {
            ...current.activePatient.measurements,
            actions: [
              ...updateDataInIndex(
                current.activePatient.measurements.actions,
                data,
                index
              ),
            ],
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
      setInitial(data: IInjuryReason) {
        const current = state.getState();
        current.updatePartialPatient({
          injuryReason: { ...current.activePatient.injuryReason, ...data },
        });
      },
      toggleReason(reason: EInjuryReason) {
        const current = state.getState();

        current.updatePartialPatient({
          injuryReason: {
            ...current.activePatient.injuryReason,
            reasons: toggleListData(
              current.activePatient.injuryReason.reasons,
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
      setInitial(data: IInjury[]) {
        const current = state.getState();
        current.updatePartialPatient({
          injuries: [...current.activePatient.injuries, ...data],
        });
      },
      updateAtIndex(data: Partial<IInjury>, index: number) {
        const current = state.getState();

        current.updatePartialPatient({
          injuries: updateDataInIndex(
            current.activePatient.injuries,
            data,
            index
          ),
        });
      },
      addInjury({ xPos, yPos, data, id }) {
        const current = state.getState();

        current.updatePartialPatient({
          injuries: [
            ...current.activePatient.injuries,
            {
              id,
              xPos,
              yPos,
              data,
            },
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
    },
    incident_information_handlers: {
      setInitial(data: IIncidentInformation) {
        const current = state.getState();
        current.updatePartialPatient({
          incident_information: {
            ...current.activePatient.incident_information,
            ...data,
          },
        });
      },
      setTime(injury_time: number) {
        const current = state.getState();

        current.updatePartialPatient({
          incident_information: {
            ...current.activePatient.incident_information,
            injury_time,
          },
        });
      },
      setCareTime(care_time: number) {
        const current = state.getState();

        current.updatePartialPatient({
          incident_information: {
            ...current.activePatient.incident_information,
            care_time,
          },
        });
      },
      setDate(date: number) {
        const current = state.getState();

        current.updatePartialPatient({
          incident_information: {
            ...current.activePatient.incident_information,
            date,
          },
        });
      },
    },
    personal_information_handlers: {
      setInitial(data: IPersonalInformation) {
        const current = state.getState();

        current.updatePartialPatient({
          personal_information: {
            ...current.activePatient.personal_information,
            ...data,
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
      setIdf(idf_id: number) {
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
      setInitial(data: IAirway) {
        const current = state.getState();
        current.updatePartialPatient({
          airway: { ...current.activePatient.airway, ...data },
        });
      },
      toggleFulfill(fulfill: boolean) {
        const current = state.getState();

        current.updatePartialPatient({
          airway: {
            ...current.activePatient.airway,
            fulfill,
          },
        });
      },
      addAction(action: IAirWayInformation) {
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
      updateAtIndex(data: Partial<IAirWayInformation>, index: number) {
        const current = state.getState();

        current.updatePartialPatient({
          airway: {
            ...current.activePatient.airway,
            actions: [
              ...updateDataInIndex(
                current.activePatient.airway.actions,
                data,
                index
              ),
            ],
          },
        });
      },
    },
    breathing_handlers: {
      setInitial(data: IBreathing) {
        const current = state.getState();
        current.updatePartialPatient({
          breathing: { ...current.activePatient.breathing, ...data },
        });
      },
      toggleFulfill(fulfill: boolean) {
        const current = state.getState();
        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            fulfill,
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
      addAction(action: IBreathingInformation) {
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
      updateAtIndex(data: Partial<IBreathingInformation>, index: number) {
        const current = state.getState();

        current.updatePartialPatient({
          breathing: {
            ...current.activePatient.breathing,
            actions: updateDataInIndex(
              current.activePatient.breathing.actions,
              data,
              index
            ),
          },
        });
      },
    },
    consciousness_handlers: {
      setInitial(data: ECconsciousness[]) {
        const current = state.getState();
        // current.updatePartialPatient({
        //   consciousness: [...current.activePatient.consciousness, ...data],
        // });
      },
      toggleConsciousness(select: ECconsciousness) {
        const current = state.getState();

        current.updatePartialPatient({
          consciousness: [
            ...toggleListData(current.activePatient.consciousness, select),
          ],
        });
      },
    },
    esection_handlers: {
      setInitial(data: EEsectionChips[]) {
        const current = state.getState();
        current.updatePartialPatient({
          eSection: [...current.activePatient.eSection, ...data],
        });
      },
      toggleSelection(select: string) {
        const current = state.getState();
        current.updatePartialPatient({
          eSection: toggleListData(current.activePatient.eSection, select),
        });
      },
    },
    evacuation_handlers: {
      setInitial(data: IEvacuationInformation) {
        const current = state.getState();
        current.updatePartialPatient({
          evacuation: { ...current.activePatient.evacuation, ...data },
        });
      },
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
        provider: undefined,
        injuries: [],
        consciousness: [],
        eSection: [],
        airway: undefined,
        breathing: undefined,
        measurements: undefined,
        reaction: undefined,
        medicationsAndFluids: undefined,
        injuryReason: undefined,
        prognosis: "",
        evacuation: undefined,
        treatmentGuide: undefined,
      };
      for (const key in final) {
        if (_.isArray(active[key])) {
          final[key] = active[key];
        } else {
          final[key] = _.omitBy(active[key], _.isNil);
        }
      }

      const updateAtIndex = patients.findIndex((p) => {
        return (
          p.personal_information.patientId ===
          final.personal_information.patientId
        );
      });

      if (updateAtIndex === -1) {
        patients.push(final);
      } else {
        patients[updateAtIndex] = final;
      }

      await storage.save({
        key: STORAGE.PATIENTS_RECORD,
        data: { patients },
      });

      set((state) => ({
        ...state,
        patients: [...patients],
        activePatient: { ...initialPatient },
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
    async addPatient(newPatient: IPatientRecord) {
      const currentData = get().patients;
      currentData.push(newPatient);
      await storage.save({ key: STORAGE.PATIENTS_RECORD, data: currentData });
      set((state) => ({ ...state, patients: currentData }));
    },
  }))
);
