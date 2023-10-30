import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, DataTable } from "react-native-paper";
import storage, { STORAGE } from "../../../storage";
import { DropDown } from "../../form-components/dropdown";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import {
  ICareProvider,
  ITaagad,
  ROLE,
  StackNavigation,
} from "../../interfaces";
import { ROUTES } from "../../routes";
import { convertToOptions } from "../homepage/tabs/report-tab/create-components/utils";

export const initialProviderState: ICareProvider = {
  full_name: null,
  idf_id: null,
  rank: null,
  unit_name: null,
  role: null,
  // expertise: null,
};

export default function TaagadScreen() {
  const [taagadDetails, updateTaagadDetails] = useState<ITaagad>({
    unit_name: "",
    care_providers: {},
  });

  useEffect(() => {
    storage
      .load({ key: STORAGE.TAAGAD })
      .then((data) => {
        data && updateTaagadDetails(data);
      })
      .catch(() => {});
  }, []);

  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();
  const saveNewProvider = () => {
    updateTaagadDetails({
      ...taagadDetails,
      care_providers: {
        ...taagadDetails.care_providers,
        [newCareProvider.idf_id]: newCareProvider,
      },
    });
    toggleProviderForm(false);
  };
  const isFormValid = () => {
    return (
      Object.values(taagadDetails.care_providers).length !== 0 &&
      taagadDetails.unit_name.length !== 0
    );
  };
  const [showNewProviderForm, toggleProviderForm] = useState<boolean>(false);
  const [newCareProvider, updateCareProvider] =
    useState<ICareProvider>(initialProviderState);
  const isCareProviderValid = () => {
    return Object.values(newCareProvider).some((prop) => !prop);
  };
  const saveCareProviderInfo = (data: Partial<ICareProvider>) => {
    updateCareProvider({
      ...newCareProvider,
      ...data,
      unit_name: taagadDetails.unit_name,
    });
  };

  useEffect(() => {
    if (
      !showNewProviderForm &&
      JSON.stringify(newCareProvider) !== JSON.stringify(initialProviderState)
    ) {
      storage.save({ key: STORAGE.TAAGAD, data: taagadDetails });

      updateCareProvider(initialProviderState);
    }
  }, [showNewProviderForm, newCareProvider]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <InputField
          label={translation("idfUnit")}
          value={taagadDetails.unit_name}
          onChange={(unit_name: string) => {
            updateTaagadDetails({ ...taagadDetails, unit_name });
          }}
        />

        {Boolean(taagadDetails.unit_name) && (
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              {/* <DataTable.Title>{translation("expertise")}</DataTable.Title> */}
              <DataTable.Title>{translation("role")}</DataTable.Title>
              <DataTable.Title>{translation("rank")}</DataTable.Title>
              <DataTable.Title>{translation("idf_id")}</DataTable.Title>
              <DataTable.Title>{translation("full_name")}</DataTable.Title>
            </DataTable.Header>
            {Object.values(taagadDetails.care_providers).map((careProvider) => {
              return (
                <DataTable.Row key={careProvider.idf_id}>
                  {/* <DataTable.Cell>{careProvider.expertise}</DataTable.Cell> */}
                  <DataTable.Cell>{careProvider.role}</DataTable.Cell>
                  <DataTable.Cell>{careProvider.rank}</DataTable.Cell>
                  <DataTable.Cell>{careProvider.idf_id}</DataTable.Cell>
                  <DataTable.Cell>{careProvider.full_name}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
            <DataTable.Row
              style={{
                borderBottomColor: "transparent",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Button mode="contained" onPress={() => toggleProviderForm(true)}>
                {translation("addCareProvider")}
              </Button>
            </DataTable.Row>
          </DataTable>
        )}

        {showNewProviderForm && (
          <View>
            <Card style={styles.form} mode="outlined">
              <Card.Content>
                {["full_name", "idf_id", "rank"].map((item) => (
                  <InputField
                    maxLength={item === "idf_id" ? 7 : null}
                    numeric={item === "idf_id"}
                    label={translation(item)}
                    onChange={(value: string) => {
                      saveCareProviderInfo({ [item]: value });
                    }}
                    value={newCareProvider[item]}
                  />
                ))}
                <DropDown
                  placeholder={translation("select")}
                  label={translation("role")}
                  options={convertToOptions(ROLE, translation)}
                  initialValue={newCareProvider.role}
                  onSelect={(role) => {
                    saveCareProviderInfo({ role: role.id as ROLE });
                  }}
                />
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="outlined"
                  onPress={() => {
                    updateCareProvider(initialProviderState);
                    toggleProviderForm(false);
                  }}
                >
                  {translation("cancel")}
                </Button>
                <Button
                  disabled={isCareProviderValid()}
                  onPress={saveNewProvider}
                >
                  {translation("save")}
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )}
        <Button
          mode="contained"
          disabled={!isFormValid()}
          onPress={() => {
            navigation.navigate(ROUTES.HOME);
          }}
        >
          {translation("continue")}
        </Button>
        <Button
          mode="contained"
          disabled={!isFormValid()}
          style={{ backgroundColor: "red", marginTop: 100 }}
          onPress={() => {
            storage.clearMap();
          }}
        >
          CAUTION!! DELETE ALL
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    direction: "rtl",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  table: { margin: 4, width: "98%" },
  tableHeader: { backgroundColor: "rgba(229, 241, 255, 1)" },
  form: { backgroundColor: "rgba(229, 241, 255, 1)" },
});
