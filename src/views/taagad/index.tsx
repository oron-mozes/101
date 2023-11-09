import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Divider, IconButton, Text } from "react-native-paper";
import storage, { STORAGE } from "../../../storage";
import { DropDown } from "../../form-components/dropdown";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { ICareProvider, RANK, ROLE, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { colors } from "../../shared-config";
import { useTaggadStore } from "../../store/taggad.store";
import { convertToOptions } from "../homepage/tabs/report-tab/create-components/utils";
import { BluLogo } from "./blue-logo";

export const initialProviderState: ICareProvider = {
  full_name: null,
  idf_id: null,
  rank: null,
  unit_name: null,
  role: null,
};

export default function TaagadScreen() {
  const {
    addProvider,
    taggad,
    removeProvider,
    updateTaagadName,
    loadInitialState,
  } = useTaggadStore();

  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();
  const [newCareProvider, updateCareProvider] = useState<ICareProvider>({
    ...initialProviderState,
  });
  const [taggadName, setTaggdName] = useState<string>();

  const saveNewProvider = async () => {
    await addProvider(newCareProvider);
    updateCareProvider({ ...initialProviderState });
  };
  const isFormValid = () => {
    return (
      Object.values(taggad.care_providers).length !== 0 &&
      taggad.unit_name.length !== 0
    );
  };

  const isCareProviderValid = useCallback(() => {
    return Object.values(newCareProvider).some((prop) => !prop);
  }, [newCareProvider]);

  const saveCareProviderInfo = (data: Partial<ICareProvider>) => {
    const merged = {
      ...newCareProvider,
      ...data,
      unit_name: taggad.unit_name,
    };

    updateCareProvider(merged);
  };

  const DDOptions = {
    role: convertToOptions(ROLE, translation),
    rank: convertToOptions(RANK, translation),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <BluLogo />
        <Text
          variant="headlineSmall"
          style={{ fontWeight: "bold", marginTop: 30, marginBottom: 30 }}
        >
          {translation("station")}
        </Text>

        {Boolean(taggad.unit_name) ? (
          <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
            {taggad.unit_name}
          </Text>
        ) : (
          <>
            <InputField
              editable={Boolean(taggad.unit_name)}
              label={translation("idfUnit")}
              value={taggadName}
              onChange={(unit_name: string) => {
                setTaggdName(unit_name);
              }}
            />
            <Button
              mode="contained"
              onPress={() => {
                updateTaagadName(taggadName);
              }}
            >
              {translation("continue")}
            </Button>
          </>
        )}
        <Divider style={{ marginTop: 10, marginBottom: 10, width: "100%" }} />

        {Boolean(taggad.unit_name) &&
          Object.values(taggad.care_providers).map((careProvider, index) => {
            return (
              <View style={styles.fields} key={index}>
                {["full_name", "idf_id"].map((item) => (
                  <InputField
                    key={item}
                    editable={true}
                    maxLength={item === "idf_id" ? 7 : null}
                    numeric={item === "idf_id"}
                    label={translation(item)}
                    onChange={(value) => {}}
                    value={
                      item === "idf_id"
                        ? careProvider[item]?.toString()
                        : careProvider[item]
                    }
                  />
                ))}
                {["rank", "role"].map((item) => (
                  <DropDown
                    key={item}
                    editable={true}
                    label={translation(item)}
                    options={DDOptions[item]}
                    initialValue={careProvider[item]}
                    onSelect={(selected) => {}}
                  />
                ))}
                <IconButton
                  icon="trash-can-outline"
                  iconColor={colors.primary}
                  size={30}
                  onPress={() => removeProvider(careProvider.idf_id)}
                />
              </View>
            );
          })}

        {Boolean(taggad.unit_name) && (
          <>
            <View style={styles.fields}>
              {["full_name", "idf_id"].map((item) => (
                <InputField
                  key={item}
                  editable={false}
                  maxLength={item === "idf_id" ? 7 : null}
                  numeric={item === "idf_id"}
                  label={translation(item === "idf_id" ? "idf" : item)}
                  onChange={(value: string) => {
                    saveCareProviderInfo({ [item]: value });
                  }}
                  value={newCareProvider[item]}
                />
              ))}
              {["rank", "role"].map((item) => (
                <DropDown
                  key={item}
                  editable={false}
                  label={translation(item)}
                  options={DDOptions[item]}
                  initialValue={newCareProvider[item]}
                  onSelect={(selected) => {
                    saveCareProviderInfo({ [item]: selected.id });
                  }}
                />
              ))}

              <Button
                mode="outlined"
                disabled={isCareProviderValid()}
                onPress={saveNewProvider}
              >
                {translation("add")}
              </Button>
            </View>
            <Button
              mode="contained"
              disabled={!isFormValid()}
              style={{ marginTop: 30 }}
              onPress={() => {
                navigation.navigate(ROUTES.HOME);
              }}
            >
              {translation("continue")}
            </Button>
            <Button
              mode="contained"
              textColor="#fff"
              style={{ backgroundColor: "red", marginTop: 100 }}
              onPress={async () => {
                storage.clearMap();
                await Promise.all([
                  // storage.remove({ key: STORAGE.TAAGAD }),
                  storage.remove({ key: STORAGE.PATIENTS_RECORD }),
                ]);
                await loadInitialState();
                navigation.navigate(ROUTES.HOME);
              }}
            >
              CAUTION!! DELETE ALL
            </Button>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fields: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    backgroundColor: colors.surface,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
