import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import storage, { STORAGE } from "../../../storage";
import { IPatientRecord, ITaagad, StackNavigation } from "../../interfaces";
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

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigation>();
  const [userDetails, setUserDetails] = useState<typeof initialState | null>();
  const [tab, changeTabView] = useState<TAB_STATUS>(TAB_STATUS.STATUS);
  useEffect(() => {
    !userDetails &&
      storage
        .load({
          key: STORAGE.TAAGAD,
        })
        .then((taagad: ITaagad) => {
          if (Object.values(taagad.care_providers).length === 0) {
            navigation.navigate(ROUTES.ACCOUNT);
            return;
          }
          storage
            .load({
              key: STORAGE.USER,
            })
            .then((user) => {
              setUserDetails(user);
            })
            .catch(() => {});
        })
        .catch(() => {
          navigation.navigate(ROUTES.ACCOUNT);
        });
  }, [userDetails]);

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

      <HomepageFooter onViewChange={changeTabView} selected={tab} />
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
