import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ToggleButton, Text } from "react-native-paper";
import { DialogWrapper } from "../../../components/dialog";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../store/patients.record.store";
import { useStationStore } from "../../../store/station.store";
import { colors, inputFontSize } from "../../../shared-config";

export function StationGlobalActions({
  isYakar,
  setIsYakar,
}: {
  setIsYakar(flag: boolean): void;
  isYakar: boolean;
}) {
  const translation = useTranslation();
  const [showDeleteModal, toggleDeleteModal] = useState<boolean>(false);
  const deletePatients = usePatientRecordsStore(
    (state) => state.deletePatients
  );
  const hardStationReset = useStationStore((state) => state.hardStationReset);
  const unit_name = useStationStore((state) => state.station.unit_name);
  const [disabled, setDisable] = useState<boolean>(!Boolean(unit_name));

  useEffect(() => {
    setDisable(!Boolean(unit_name));
    return () => {
      setDisable(!Boolean(unit_name));
    };
  }, [unit_name]);

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <Text
          style={{
            marginRight: 5,
            fontSize: inputFontSize,
          }}
        >
          {translation("yakar")}
        </Text>
        <ToggleButton
          size={35}
          iconColor={isYakar ? "#14B881" : colors.disabled}
          icon={isYakar ? "toggle-switch-outline" : "toggle-switch-off-outline"}
          value="bluetooth"
          status={isYakar ? "checked" : "unchecked"}
          onPress={() => setIsYakar(!isYakar)}
        />
      </View>
      <View style={[styles.container]}>
        <DialogWrapper
          testId="delete-station"
          visible={showDeleteModal}
          onClose={() => toggleDeleteModal(false)}
          title={translation("deleteStationTitle")}
          description={translation("deleteStationDescription")}
          onConfirm={async () => {
            await Promise.all([deletePatients(), hardStationReset()]);
            toggleDeleteModal(false);
          }}
        />

        <Button
          disabled={disabled}
          testID="delete-station"
          onPress={() => toggleDeleteModal(true)}
          icon="delete-outline"
          textColor="red"
        >
          <Text style={{ fontSize: inputFontSize, color: "red" }}>
            {translation("deleteStation")}
          </Text>
        </Button>
        {/* <Button
        disabled={disabled}
        onPress={() => toggleShareModal(true)}
        icon="share-variant-outline"
      >
        {translation("share")}
      </Button> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
});
