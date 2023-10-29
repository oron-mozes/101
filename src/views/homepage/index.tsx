import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import storage, { STORAGE } from "../../../storage";
import { IPatientRecord, IProps, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { initialState } from "../care-provider";
import { HomepageFooter } from "./footer";
import { ReportTab } from "./tabs/report-tab";
import { StatusTab } from "./tabs/status-tab";

export enum TAB_STATUS {
  STATUS = "STATUS",
  CREATE = "CREATE",
  SCAN = "SCAN",
}

export default function HomeScreen({ route }: IProps) {
  const navigation = useNavigation<StackNavigation>();
  const [tab, changeTabView] = useState<TAB_STATUS>(
    route.params?.tab ?? TAB_STATUS.STATUS
  );
  useEffect(() => {
    storage
      .load({
        key: STORAGE.TAAGAD,
      })
      .then(() => {})
      .catch(() => {
        navigation.navigate(ROUTES.ACCOUNT);
      });
  }, []);
  useEffect(() => {
    route.params?.tab && changeTabView(route.params.tab);
  }, [route.params]);
  const [selectedPatient, setPatient] = useState<IPatientRecord>();

  return (
    <SafeAreaView style={styles.container}>
      {tab === TAB_STATUS.STATUS && (
        <StatusTab
          setPatient={(patient: IPatientRecord) => {
            setPatient(patient);
            changeTabView(TAB_STATUS.CREATE);
          }}
        />
      )}
      {tab === TAB_STATUS.CREATE && <ReportTab patient={selectedPatient} />}

      <HomepageFooter
        onViewChange={(view) => {
          setPatient(null);
          changeTabView(view);
        }}
        selected={tab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
});
