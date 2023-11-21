import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { initialProviderState } from ".";
import { DropDown } from "../../form-components/dropdown";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { ICareProvider, RANK, ROLE } from "../../interfaces";
import { colors } from "../../shared-config";
import { convertToOptions } from "../homepage/tabs/report-tab/create-components/utils";

export function AddProvider({
  newCareProvider,
  updateCareProvider,
}: {
  newCareProvider: ICareProvider;
  updateCareProvider(provider: ICareProvider): void;
}) {
  const translation = useTranslation();

  const DDOptions = {
    role: convertToOptions(ROLE, translation),
    rank: convertToOptions(RANK, translation),
  };

  return (
    <View style={styles.fields}>
      <View style={{ flex: 1 }}>
        <InputField
          label={translation("full_name")}
          onChange={(value: string) => {
            updateCareProvider({ ...newCareProvider, full_name: value });
          }}
          value={newCareProvider.full_name}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <InputField
          maxLength={9}
          numeric={true}
          label={translation("tz")}
          onChange={(value: string) => {
            updateCareProvider({ ...newCareProvider, idf_id: Number(value) });
          }}
          value={newCareProvider.idf_id?.toString()}
        />

        <DropDown
          label={translation("role")}
          options={DDOptions.role}
          initialValue={
            newCareProvider.role && translation(newCareProvider.role)
          }
          onSelect={(selected) => {
            updateCareProvider({
              ...newCareProvider,
              role: selected.id as ROLE,
            });
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            updateCareProvider({ ...initialProviderState });
          }}
        >
          <View
            style={{
              justifyContent: "center",
              width: 30,
              alignItems: "center",
              paddingTop: 50,
            }}
          >
            <Icon source="trash-can-outline" color={colors.primary} size={20} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
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
    width: "100%",
    backgroundColor: colors.surface,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
