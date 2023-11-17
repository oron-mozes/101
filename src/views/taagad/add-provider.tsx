import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { initialProviderState } from ".";
import { DropDown } from "../../form-components/dropdown";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { ICareProvider, RANK, ROLE, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { colors } from "../../shared-config";
import { useTaggadStore } from "../../store/taggad.store";
import { convertToOptions } from "../homepage/tabs/report-tab/create-components/utils";

export function AddProvider() {
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();

  const { addProvider, taggad, removeProvider, updateTaagadName } =
    useTaggadStore();
  const DDOptions = {
    role: convertToOptions(ROLE, translation),
    rank: convertToOptions(RANK, translation),
  };
  const [newCareProvider, updateCareProvider] = useState<ICareProvider>({
    ...initialProviderState,
  });
  const saveCareProviderInfo = (data: Partial<ICareProvider>) => {
    const merged = {
      ...newCareProvider,
      ...data,
      unit_name: taggad.unit_name,
    };

    updateCareProvider(merged);
  };

  const isCareProviderValid = useCallback(() => {
    return Boolean(
      newCareProvider.full_name &&
        newCareProvider.idf_id &&
        newCareProvider.role
    );
  }, [newCareProvider]);

  const isFormValid = () => {
    return (
      Object.values(taggad.care_providers).length !== 0 &&
      taggad.unit_name.length !== 0
    );
  };
  const saveNewProvider = async () => {
    await addProvider(newCareProvider);
    updateCareProvider({ ...initialProviderState });
  };

  return (
    <>
      {Boolean(taggad.unit_name) && (
        <>
          <View style={styles.fields}>
            {["full_name", "idf_id"].map((item) => (
              <InputField
                key={item}
                editable={true}
                maxLength={item === "idf_id" ? 9 : null}
                numeric={item === "idf_id"}
                label={translation(item === "idf_id" ? "tz" : item)}
                onChange={(value: string) => {
                  saveCareProviderInfo({ [item]: value });
                }}
                value={newCareProvider[item]}
              />
            ))}
            {["role"].map((item) => (
              <DropDown
                key={item}
                editable={true}
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
              disabled={!isCareProviderValid()}
              onPress={saveNewProvider}
            >
              {translation("add")}
            </Button>
          </View>
          {Object.keys(taggad.care_providers ?? {}).length !== 0 && (
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
          )}
        </>
      )}
    </>
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
