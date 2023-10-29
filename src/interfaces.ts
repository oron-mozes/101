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
  status: STATUS;
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
export type TCconsciousness = "awake" | "voice" | "pain" | "none";
export type TE = "undressing" | "flipping" | "splinting";
export type TInjuryReason =
  | "shooting"
  | "charge"
  | "falling"
  | "blunt"
  | "burns"
  | "smoke"
  | "accident"
  | "guided"
  | "gas";

export interface IInjuryReason {
  reasons: TInjuryReason[];
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
export interface IPatientRecord {
  id?: string;
  personal_information: IPersonalInformation;
  incident_information: IIncidentInformation;
  care_team: ICareProvider[];
  injuries: IInjury[];
  consciousness: TCconsciousness[];
  e: TE[];
  airway: IAirway;
  breathing: IBreathing;
  measurements: IMeasurements;
  reaction: IReaction;
  injuryReason: IInjuryReason;
  prognosis: string;
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
  ACTIVE = "active",
  URGENT = "urgent",
  NONE_URGENT = "noneUrgent",
  EVACUATED = "evacuated",
  RE_ACTIVE = "reActive",
  URGENT_EVAC = "urgentEvac",
  NONE_URGENT_EVAC = "noneUrgentEvac",
}
