import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";

interface IPersonalInformation {
  full_name: string;
  idf_id: number;
}
interface IIncidentInformation {
  injury_time: Date;
  care_time: Date;
  date: Date;
  status: STATUS;
}

interface IInjury {}
type TCconsciousness = "awake" | "voice" | "pain" | "none";

export interface IPatientRecord {
  id?: string;
  personal_information: IPersonalInformation;
  incident_information: IIncidentInformation;
  care_team: ICareTeamMember[];
  injuries: IInjury[];
  consciousness: TCconsciousness[];
}
export interface ICareTeamMember {
  fullName: string;
  idf_id: number;
  rank: string;
  unit: string;
  role: string;
  expertise: string;
}

export interface ICareGiver {
  full_name: string;
  idf_id: number;
  rank: string;
  unit: string;
  role: string;
  expertise: string;
}

export interface ITaagad {
  unit: string;
  care_givers: Map<string, ICareGiver>;
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
