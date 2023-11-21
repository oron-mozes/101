import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { DropDown } from "../../../form-components/dropdown";
import { InputField } from "../../../form-components/input-field";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { ICareProvider, RANK, ROLE } from "../../../interfaces";
import { colors } from "../../../shared-config";
import { convertToOptions } from "../../homepage/tabs/report-tab/create-components/utils";

export function SavedProvider({
  providers,
  removeProvider,
}: {
  providers: ICareProvider[];
  removeProvider(id): void;
}) {
  const translation = useTranslation();
  const DDOptions = {
    role: convertToOptions(ROLE, translation),
    rank: convertToOptions(RANK, translation),
  };
  return (
    <>
      {providers.map((careProvider, index) => {
        return (
          <View style={styles.fields} key={index}>
            {["full_name", "idf_id"].map((item) => (
              <InputField
                key={item}
                editable={true}
                maxLength={item === "idf_id" ? 9 : null}
                numeric={item === "idf_id"}
                label={translation(item === "idf_id" ? "tz" : item)}
                onChange={(value) => {}}
                value={
                  item === "idf_id"
                    ? careProvider[item]?.toString()
                    : careProvider[item]
                }
              />
            ))}
            {["role"].map((item) => (
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
              onPress={removeProvider}
            />
          </View>
        );
      })}
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
});
