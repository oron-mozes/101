import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, lazy, useMemo, Suspense } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { RootStackParamList, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { useStationStore } from "../../store/station.store";
import { HomepageFooter } from "./footer";
import { colors } from "../../shared-config";
import StatusTab from "./tabs/status-tab";
import { OffScreenBodyPicker } from "../../components/body-picker/off-screen-capture";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import ReportTab from "./tabs/report-tab";

export enum TAB_STATUS {
  STATUS = "STATUS",
  CREATE = "CREATE",
  SCAN = "SCAN",
}

export function HomeScreen() {
  const { station } = useStationStore();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const navigation = useNavigation<StackNavigation>();
  const tab = useMemo(
    () => route.params?.tab ?? TAB_STATUS.STATUS,
    [route.params?.tab]
  );
  const patients = usePatientRecordsStore((state) => state.patients);
  useEffect(() => {
    if (!station.unit_name) {
      navigation.navigate(ROUTES.STATION);
    }
  }, [route.params?.tab]);

  return (
    <SafeAreaView style={styles.container}>
      {tab === TAB_STATUS.STATUS && <StatusTab />}
      {tab === TAB_STATUS.CREATE && <ReportTab />}
      <HomepageFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: colors.textInputBG,
  },
});

export default HomeScreen;
