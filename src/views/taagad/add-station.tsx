import { useState } from "react";
import { Button } from "react-native-paper";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { useStationStore } from "../../store/station.store";

export function AddStation() {
  const translation = useTranslation();
  const { station: taggad, updateStationName: updateTaagadName } =
    useStationStore();
  const [taggadName, setTaggdName] = useState<string>();

  return (
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
  );
}
