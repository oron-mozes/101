import { NavigationProp } from "@react-navigation/native";
import { IPatientRecord } from "./views/patient";

export type RootStackParamList = Record<
  string,
  { patient?: IPatientRecord } | undefined
>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export const ROUTES = {
  HOME: "Home",
  ACCOUNT: "UserDetails",
  REPORT: "Report",
  IMPORT_PATIENT: "ImportPatient",
};
