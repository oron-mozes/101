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
export type TAirWayTreatment = "aw" | "intube" | "coniotomy";
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

export const TOGGLE = {
  YES: "yes",
  NO: "no",
};
export interface IPatientRecord {
  id?: string;
  personal_information: IPersonalInformation;
  incident_information: IIncidentInformation;
  care_team: ICareTeamMember[];
  injuries: IInjury[];
  consciousness: TCconsciousness[];
  e: TE[];
  airway: IAirWayInformation[];
  injuryReason: IInjuryReason;
  prognosis: string;
}
export interface ICareTeamMember {
  fullName: string;
  idf_id: number;
  rank: string;
  unit: string;
  role: string;
  expertise: string;
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
