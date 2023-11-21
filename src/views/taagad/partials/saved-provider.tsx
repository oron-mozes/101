import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from "react-native-paper";
import { DropDown } from "../../../form-components/dropdown";
import { InputField } from "../../../form-components/input-field";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { ICareProvider, ROLE } from "../../../interfaces";
import { colors } from "../../../shared-config";
import { convertToOptions } from "../../homepage/tabs/report-tab/create-components/utils";

export function SavedProvider({
  provider,
  removeProvider,
}: {
  provider: ICareProvider;
  removeProvider(id): void;
}) {
  const translation = useTranslation();

  const DDOptions = {
    role: convertToOptions(ROLE, translation),
  };

  return (
    <View style={styles.fields}>
      <View style={{ flex: 1 }}>
        <InputField
          editable={false}
          label={translation("full_name")}
          onChange={(value: string) => {}}
          value={provider.full_name}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <InputField
          editable={false}
          maxLength={9}
          numeric={true}
          label={translation("tz")}
          onChange={(value: string) => {}}
          value={provider.idf_id?.toString()}
        />

        <DropDown
          editable={false}
          label={translation("role")}
          options={DDOptions.role}
          initialValue={provider.role && translation(provider.role)}
          onSelect={(selected) => {}}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            removeProvider(provider.idf_id);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              width: 30,
              alignItems: "center",
              paddingTop: 30,
            }}
          >
            <Icon source="trash-can-outline" size={20} color={colors.primary} />
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
