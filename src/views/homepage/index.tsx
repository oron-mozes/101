import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { RootStackParamList, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { useTaggadStore } from "../../store/taggad.store";
import { HomepageFooter } from "./footer";
import { ReportTab } from "./tabs/report-tab";
import { StatusTab } from "./tabs/status-tab";
import { colors } from "../../shared-config";

export enum TAB_STATUS {
  STATUS = "STATUS",
  CREATE = "CREATE",
  SCAN = "SCAN",
}

export default function HomeScreen() {
  const { taggad } = useTaggadStore();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const navigation = useNavigation<StackNavigation>();
  const tab = useMemo(
    () => route.params?.tab ?? TAB_STATUS.STATUS,
    [route.params?.tab]
  );

  useEffect(() => {
    if (!taggad.unit_name) {
      navigation.navigate(ROUTES.ACCOUNT);
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
