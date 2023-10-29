import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import { InjuryReason } from "./views/homepage/tabs/report-tab/create-components/injury-reason";

export interface IPersonalInformation {
  full_name: string;
  idf_id: number;
}
interface IIncidentInformation {
  injury_time: number;
  care_time: number;
  date: number;
}

export interface IOption {
  id: string;
  title: string;
}

interface IInjury {}
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
export type TBreathingTreatment = "OXIGEN" | "MOUTH" | "NA" | "CHEST_TUBE";
export enum ECconsciousness {
  AWAKE = "AWAKE",
  VOICE = "VOICE",
  PAIN = "PAIN",
  APVN_NONE = "APVU_NONE",
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
}
export interface IBreathingInformation {
  action: TBreathingTreatment;
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
export type TMeasurementsTreatments =
  | "STOP_BLEEDING"
  | "PERIPHERAL"
  | "CENTRAL_VAIN"
  | "IO";

export interface IMeasurementsInformation {
  action: TMeasurementsTreatments;
  time: number;
  successful: boolean;
}
export interface IMeasurements {
  actions: IMeasurementsInformation[];
  fulfill: boolean;
  shock: boolean;
  palpated: boolean;
  puls: number;
  bloodPressure: {
    diastolic: number;
    systolic: number;
  };
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
export type TFluid = "";
export type TMedications = "";
export interface IMedicationsAndFluidInformation {
  action: EMedications;
  dose: number;
  time: number;
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
  SPECIAL_CARE = "SPECIAL_CARE",
}
export interface IEvacuationInformation {
  time: number;
  destination: string;
  transportation: ETransportation;
  status: STATUS;
}

export interface IPatientRecord {
  id?: string;
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
}

export interface ICareProvider {
  full_name: string;
  idf_id: number;
  rank: string;
  unit_name: string;
  role: string;
  expertise: string;
}

export interface ITaagad {
  unit_name: string;
  care_providers: { [key: string]: ICareProvider };
}

export interface IProps extends NativeStackScreenProps<RootStackParamList> {}
export type RootStackParamList = Record<
  string,
  { patient?: IPatientRecord } | undefined
>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export enum STATUS {
  URGENT = "URGENT",
  EVACUATED = "EVACUATED",
  ACTIVE = "ACTIVE",
  NEW_PATIENT = "NEW_PATIENT",
  PENDING = "PENDING",
}
