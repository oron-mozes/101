import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import storage, { STORAGE } from "../../../storage";
import { InputField } from "../../form-components/input-field";
import { ToggleButton } from "../../form-components/ToggleButton";
import { SectionHeader } from "../../form-components/section-header";
import { CheckButton } from "../../form-components/select-button";
import {
  IStatusChipProps,
  StatusChip,
} from "../../form-components/status-chip";
import { useTranslation } from "../../hooks/useMyTranslation";
import { usePatientsRecord } from "../../hooks/usePatientsRecord";
import {
  IPatientRecord,
  ITaagad,
  STATUS,
  StackNavigation,
} from "../../interfaces";
import { ROUTES } from "../../routes";
import { initialState } from "../care-provider";
import { HomepageFooter } from "./footer";
import { StatusTab } from "./tabs/status-tab";
import { ReportTab } from "./tabs/report-tab";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();
  const [userDetails, setUserDetails] = useState<typeof initialState | null>();
  const [tab, changeTabView] = useState<"status" | "create">("status");
  const { patientsRecord, loadRecords } = usePatientsRecord();
  // storage.clearMapForKey(STORAGE.USER);

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
          loadRecords();
        })
        .catch(() => {
          navigation.navigate(ROUTES.ACCOUNT);
        });

    return navigation.addListener("focus", loadRecords);
  }, [userDetails]);

  const chips: IStatusChipProps[] = [
    { label: translation("active"), status: STATUS.ACTIVE },
    { label: translation("urgent"), status: STATUS.URGENT },
    { label: translation("noneUrgent"), status: STATUS.NONE_URGENT },
    { label: translation("evacuated"), status: STATUS.EVACUATED },
    { label: translation("reActive"), status: STATUS.RE_ACTIVE },
    { label: translation("urgentEvac"), status: STATUS.URGENT_EVAC },
    { label: translation("noneUrgentEvac"), status: STATUS.NONE_URGENT_EVAC },
  ];

  const [selectedPatient, setPatient] = useState<IPatientRecord>();
  const [inputTest, updateInputTest] = useState<string>();
  const [radioCheck, toggleRadioCheck] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <FlatList
          numColumns={3}
          data={chips}
          renderItem={({ item }) => (
            <StatusChip label={item.label} status={item.status} />
          )}
        />
      </View> */}
      {/* <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <CheckButton
          label={translation("yes")}
          checked={yesCheck}
          onSelect={() => {
            toggleYesCheck(!yesCheck);
          }}
        />
        <CheckButton
          label={translation("no")}
          checked={false}
          disabled={true}
          onSelect={() => {
            toggleYesCheck(!yesCheck);
          }}
        />
      </View>
      <View>
        <InputField
          label={translation("patientName")}
          value={inputTest}
          onChange={updateInputTest}
        />
      </View> */}
      {/* <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <RadioButton
          value={"yes"}
          status={radioCheck}
          onSelect={() => {
            toggleRadioCheck(!radioCheck);
          }}
          label={translation("text")}
        />
        <RadioButton
          disabled={true}
          value={"yes"}
          status={false}
          onSelect={() => {}}
          label={translation("text")}
        />
      </View> */}
      {/* <SectionHeader label={translation("avpu")} /> */}
      {tab === "status" && (
        <StatusTab
          setPatient={(patient: IPatientRecord) => {
            setPatient(patient);
            changeTabView("create");
          }}
        />
      )}
      {tab === "create" && <ReportTab patient={selectedPatient} />}

      <HomepageFooter onViewChange={changeTabView} selected={tab} />

      {/* <View style={styles.scrollView}>
        <Card>
          <Button onPress={() => navigation.navigate(ROUTES.REPORT)}>
            {translation("addPatient")}
          </Button>
        </Card>
        <Card>
          <Button onPress={() => navigation.navigate(ROUTES.IMPORT_PATIENT)}>
            {translation("importPatient")}
          </Button>
        </Card>
      </View> */}
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
  scrollView: {
    width: "90%",
  },
  list: {
    alignContent: "flex-end",
    width: "100%",
  },
});
