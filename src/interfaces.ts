import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TAB_STATUS } from "./views/homepage";

export interface IPersonalInformation {
  full_name: string;
  idf_id: number;
  patientId: string;
}
export interface IIncidentInformation {
  injury_time: number;
  care_time: number;
  date: number;
}

export interface IOption {
  id: string;
  title: string;
}

export enum EPosition {
  LEFT_LEG = "LEFT_LEG",
  BACK = "BACK",
  LEFT_LEG_BACK = "LEFT_LEG_BACK",
  RIGHT_LEG = "RIGHT_LEG",
  RIGHT_LEG_BACK = "RIGHT_LEG_BACK",
  LEFT_ARM = "LEFT_ARM",
  LEFT_ARM_BACK = "LEFT_ARM_BACK",
  RIGHT_ARM = "RIGHT_ARM",
  RIGHT_ARM_BACK = "RIGHT_ARM_BACK",
  ASS = "ASS",
  GENITAL = "GENITAL",
  STOMACH = "STOMACH",
  CHEST = "CHEST",
  FOREHEAD = "FOREHEAD",
  BACK_HEAD = "BACK_HEAD",
}

export enum EHT_POSITION {
  LEFT_LEG = "LEFT_LEG",
  LEFT_LEG_BACK = "LEFT_LEG_BACK",
  RIGHT_LEG = "RIGHT_LEG",
  RIGHT_LEG_BACK = "RIGHT_LEG_BACK",
  LEFT_ARM = "LEFT_ARM",
  LEFT_ARM_BACK = "LEFT_ARM_BACK",
  RIGHT_ARM = "RIGHT_ARM",
  RIGHT_ARM_BACK = "RIGHT_ARM_BACK",
}

export interface IHT {
  time: number;
}
export interface IInjuryInformation {
  gunshot?: boolean;
  hits?: boolean;
  burn?: boolean;
  cut?: boolean;
  touniquet?: boolean;
  touniquet_time?: number;
}
export enum EAirWayTreatment {
  AW = "AW",
  INTUBE = "INTUBE",
  CONIOTOMY = "CONIOTOMY",
}
export type TAirWayTreatment = "AW" | "INTUBE" | "CONIOTOMY";
export enum EBreathingTreatment {
  OXIGEN = "OXIGEN",
  MOUTH = "MOUTH",
  NA = "NA",
  CHEST_TUBE = "CHEST_TUBE",
}
export enum ECconsciousness {
  AWAKE = "AWAKE",
  VOICE = "VOICE",
  PAIN = "PAIN",
  APVN_NONE = "APVN_NONE",
}
export enum EEsectionChips {
  UNDRESSING = "UNDRESSING",
  FLIPPING = "FLIPPING",
  SPLINTING = "SPLINTING",
}
export enum EInjuryReason {
  SHOOTING = "SHOOTING",
  CHARGE = "CHARGE",
  FALLING = "FALLING",
  BLUNT = "BLUNT",
  BURNS = "BURNS",
  SMOKE = "SMOKE",
  ACCIDENT = "ACCIDENT",
  GUIDED = "GUIDED",
  GAS = "GAS",
}

export interface IInjuryReason {
  reasons: EInjuryReason[];
  circumstance: string;
}

export interface IAirWayInformation {
  action: TAirWayTreatment;
  time: number;
  successful: boolean;
  id: number;
}
export interface IBreathingInformation {
  action: EBreathingTreatment;
  time: number;
  successful: boolean;
}

export const TOGGLE = {
  YES: "yes",
  NO: "no",
};

export interface IBreathing {
  actions: IBreathingInformation[];
  breathingCount: number;
  saturation: number;
  fulfill: boolean;
}

export interface IAirway {
  actions: IAirWayInformation[];
  fulfill: boolean;
}

export enum EMeasurementsTreatments {
  STOP_BLEEDING = "STOP_BLEEDING",
  PERIPHERAL_VAIN = "PERIPHERAL",
  CENTRAL_VAIN = "CENTRAL_VAIN",
  IO = "IO",
}

export interface IMeasurementsInformation {
  action: EMeasurementsTreatments;
  time: number;
  successful: boolean;
}
export interface IMeasurements {
  actions: IMeasurementsInformation[];

  shock: boolean;
  palpated: boolean;
  puls: number;
  bloodPressure: string;
}

export enum EReactionGeneral {
  OK = "OK",
  NON_SENSORY = "NON_SENSORY",
  NON_MOTORIZED = "NON_MOTORIZED",
  UN_EQUAL_PUPILS = "UN_EQUAL_PUPILS",
}

export enum EReactionEyes {
  NONE = "NONE",
  TO_PAIN = "TO_PAIN",
  TO_VOICE = "TO_VOICE",
  SPONTANEITY = "SPONTANEITY",
}

export enum EReactionSpeech {
  NONE = "NONE",
  VOICES = "VOICES",
  WORDS = "WORDS",
  CONFUSED = "CONFUSED",
  STRAIGHT = "STRAIGHT",
}
export enum EReactionMovement {
  NONE = "NONE",
  OFTEN = "OFTEN",
  IN_PLACE = "IN_PLACE",
  RETREAT = "RETREAT",
  BENDING = "BENDING",
  STRAIGHTENING = "STRAIGHTENING",
}

export interface IReaction {
  general: EReactionGeneral[];
  eyes: EReactionEyes;
  speech: EReactionSpeech;
  movement: EReactionMovement;
  GCS: number;
}

export enum EFluid {
  BLOOD_1 = "BLOOD_1",
  BLOOD = "BLOOD",
  PLASMA_1 = "PLASMA_1",
  PLASMA = "PLASMA",
  HARTMAN_500 = "HARTMAN_500",
  HARTMAN = "HARTMAN",
}
export enum EMEDICATION {
  KETAMINE = "KETAMINE",
  DORMICUM = "DORMICUM",
  ACTIQ = "ACTIQ",
}

export enum E_ANASTASIA_KATAMIN_DOSE {
  D25MG = "D25MG",
  D50MG = "D50MG",
  D250MG = "D250MG",
  D500MG = "D500MG",
}
export enum E_ANASTASIA_DORMICUM_DOSE {
  D1_5MG = "D1_5MG",
  D5MG = "D5MG",
}
export enum E_ANASTASIA_ACTIQ_DOSE {
  D800MG = "D800MG",
}
export enum E_HEXAKAPRON_DOSE {
  D1MG = "D1MG",
}

export enum EMedications {
  HEXAKAPRON = "HEXAKAPRON",
  HEXAKAPRON_1 = "HEXAKAPRON_1",
  CETRIAXONE = "CETRIAXONE",
  CETRIAXONE_1 = "CETRIAXONE_1",
  FLAGYL = "FLAGYL",
  FLAGYL_500 = "FLAGYL_500",
  KETAMINE = "KETAMINE",
  KETAMINE_500 = "KETAMINE_500",
  KETAMINE_250 = "KETAMINE_250",
  KETAMINE_25 = "KETAMINE_25",
  DORMICUM = "DORMICUM",
  DORMICUM_5 = "DORMICUM_5",
  ACTIQ = "ACTIQ",
  ACTIQ_800 = "ACTIQ_800",
}

export enum MEDICATION_TREATMENT {
  FLUIDS = "FLUIDS",
  ANTIBIOTIC = "ANTIBIOTIC",
  ANASTASIA = "ANASTASIA",
  HEXAKAPRON = "HEXAKAPRON",
}

export enum E_FLUID_TREATMENT {
  BLOOD = "BLOOD",
  PLASMA = "PLASMA",
  HARTMAN = "HARTMAN",
}

export enum E_ANTIBIOTIC_TREATMENT {
  FLAGYL = "FLAGYL",
  CETRIAXONE = "CETRIAXONE",
}

export enum E_ANASTASIA_TREATMENT {
  KETAMINE = "KETAMINE",
  DORMICUM = "DORMICUM",
  ACTIQ = "ACTIQ",
}

export enum E_FLUID_HARTMAN_DOSE {
  D500MG = "D500MG",
}
export enum E_FLUID_PLASMA_DOSE {
  D1 = "D1",
}
export enum E_FLUID_BLOOD_DOSE {
  D1 = "D1",
}
export enum E_ANTIBIOTIC_CETRIAXONE_DOSE {
  D1 = "D1",
}
export enum E_ANTIBIOTIC_FLAGYL_DOSE {
  D500MG = "D500MG",
}
export enum E_ANTIBIOTIC_DOSE {
  D1MG = "D1MG",
  D500MG = "D500MG",
}

export type TFluid = "";
export type TMedications = "";
export interface IMedicationsAndFluidInformation {
  treatment: MEDICATION_TREATMENT;
  type: E_FLUID_TREATMENT | E_ANTIBIOTIC_TREATMENT | E_ANASTASIA_TREATMENT;
  action: EMedications;
  dose:
    | E_ANASTASIA_DORMICUM_DOSE
    | E_ANASTASIA_KATAMIN_DOSE
    | E_ANASTASIA_ACTIQ_DOSE
    | E_FLUID_HARTMAN_DOSE
    | E_FLUID_PLASMA_DOSE
    | E_FLUID_BLOOD_DOSE
    | E_ANTIBIOTIC_CETRIAXONE_DOSE
    | E_ANTIBIOTIC_FLAGYL_DOSE
    | E_HEXAKAPRON_DOSE;
  time: number;
  id: number;
}
export interface IMedicationsAndFluid {
  actions: IMedicationsAndFluidInformation[];
}

export interface ISignedProvider {
  full_name: string;
  signature: string;
  idf_id: number;
}

export enum ETransportation {
  VEHICLE = "VEHICLE",
  CHOPPER = "CHOPPER",
  NAVEL = "NAVEL",
  // SPECIAL_CARE = "SPECIAL_CARE",
}
export interface IEvacuationInformation {
  time: number;
  destination: string;
  transportation: ETransportation;
  special_care: boolean;
  status: STATUS;
}

export interface IMeasurementsAction {
  id: number;
  time: number;
  provider: ICareProvider;
  puls: number;
  bloodPressure: string;
  breath: number;
  spo2: number;
  etcos: number;
  pain: number;
  prpo: number;
  GCS: number;
  urine: number;
  blood: number;
}
export interface ITreatmentGuideMeasurementsInformation {
  period: number;
  actions: IMeasurementsAction[];
}
export interface ITreatmentGuide {
  id: number;
  care_guide: string;
  order_time: number;
  execution_time: number;
  provider_issuer: ICareProvider;
  provider_executer: ICareProvider;
}

export interface ITreatment {
  guides: ITreatmentGuide[];
  measurements: ITreatmentGuideMeasurementsInformation;
}

export interface IInjury {
  xPos: number;
  yPos: number;
  data: IInjuryInformation;
  id: number;
}
export interface IPatientRecord {
  id?: string;
  new?: boolean;
  personal_information: IPersonalInformation;
  incident_information: IIncidentInformation;
  provider: Partial<ICareProvider>;
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
}
export enum ROLE {
  MEDIC = "MEDIC",
  PARAMEDIC = "PARAMEDIC",
  MD = "MD",
}

export enum RANK {
  RANK_1 = "RANK_1",
  RANK_2 = "RANK_2",
  RANK_3 = "RANK_3",
  RANK_4 = "RANK_4",
  RANK_5 = "RANK_5",
  RANK_6 = "RANK_6",
  RANK_7 = "RANK_7",
  RANK_8 = "RANK_8",
  RANK_9 = "RANK_9",
  RANK_10 = "RANK_10",
  RANK_11 = "RANK_11",
  RANK_12 = "RANK_12",
  RANK_13 = "RANK_13",
  RANK_14 = "RANK_14",
  RANK_15 = "RANK_15",
  RANK_16 = "RANK_16",
}
export interface ICareProvider {
  full_name: string;
  idf_id: number;
  rank: RANK;
  unit_name: string;
  role: ROLE;
}

export interface ITaagad {
  unit_name: string;
  care_providers: { [key: string]: ICareProvider };
}

export interface IProps extends NativeStackScreenProps<RootStackParamList> {}
export type RootStackParamList = Record<
  string,
  { patient?: IPatientRecord; tab?: TAB_STATUS } | undefined
>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export enum STATUS {
  // NEW_PATIENT = "NEW_PATIENT",
  URGENT = "URGENT",
  TO_EVAC = "TO_EVAC",
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}
