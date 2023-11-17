import { useState } from "react";
import { Button, Text } from "react-native-paper";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { useTaggadStore } from "../../store/taggad.store";
import { BluLogo } from "./blue-logo";

export function AddStation() {
  const translation = useTranslation();
  const { taggad, updateTaagadName } = useTaggadStore();
  const [taggadName, setTaggdName] = useState<string>();

  return (
    <>
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
            editable={true}
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
    </>
  );
}
