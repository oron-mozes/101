import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { initialProviderState } from ".";
import { DropDown } from "../../form-components/dropdown";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { ICareProvider, RANK, ROLE } from "../../interfaces";
import { colors } from "../../shared-config";
import { convertToOptions } from "../homepage/tabs/report-tab/create-components/utils";

export function AddProvider({
  addProvider,
}: {
  addProvider(provider: ICareProvider): void;
}) {
  const translation = useTranslation();

  const DDOptions = {
    role: convertToOptions(ROLE, translation),
    rank: convertToOptions(RANK, translation),
  };
  const [newCareProvider, updateCareProvider] = useState<ICareProvider>({
    ...initialProviderState,
  });

  return (
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
              updateCareProvider({ ...newCareProvider, [item]: value });
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
              updateCareProvider({ ...newCareProvider, [item]: selected.id });
            }}
          />
        ))}
      </View>
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
