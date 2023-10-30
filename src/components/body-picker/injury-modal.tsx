import { Divider, Modal, Portal, Text } from "react-native-paper";
import { EHT_POSITION, EPosition, IInjuryInformation } from "../../interfaces";
import { useTranslation } from "../../hooks/useMyTranslation";
import { StyleSheet, View } from "react-native";
import { colors } from "../../shared-config";
import { InputField } from "../../form-components/input-field";
import { TimePicker } from "../../form-components/time-picker";
import { ToggleButton } from "../../form-components/ToggleButton";
import { useState } from "react";
import { convertStringToNumber } from "../../views/homepage/tabs/report-tab/create-components/utils";

export function InjuryModal({
  closeHandler,
  onChange,
  position,
  data,
}: {
  data: IInjuryInformation;
  position: EPosition | EHT_POSITION;
  onChange(value): void;
  closeHandler(): void;
}) {
  const translation = useTranslation();
  const [status, setStatus] = useState<IInjuryInformation>(data);
  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={() => {
          onChange({ position, data: status });
          closeHandler();
        }}
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
          backgroundColor: colors.textInputBG,
        }}
      >
        <View style={styles.content}>
          <Text variant="headlineSmall" style={{ flex: 1 }}>
            {translation(position)}
          </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <InputField
              label={translation("gunshots")}
              numeric
              value={status?.gunshots?.toString()}
              onChange={(gunshots) => {
                setStatus({
                  ...status,
                  gunshots: convertStringToNumber(gunshots),
                });
              }}
            />

            <InputField
              label={translation("hits")}
              numeric
              value={status?.hits?.toString()}
              onChange={(hits) => {
                setStatus({ ...status, hits: convertStringToNumber(hits) });
              }}
            />
          </View>
          {EHT_POSITION[position] && (
            <>
              <Divider style={{ flex: 1, marginTop: 10, marginBottom: 10 }} />

              <ToggleButton
                status={status?.HT}
                label={translation("TH")}
                onSelect={(HT: boolean) => {
                  setStatus({ ...status, HT });
                }}
              />
              {status?.HT && (
                <TimePicker
                  value={status.HT_time}
                  label={translation("TH_time")}
                  onChange={(HT_time: number) => {
                    setStatus({ ...status, HT_time });
                  }}
                />
              )}
            </>
          )}
          <View style={{ flex: 1 }} />
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.textInputBG,
    width: 260,
    height: 250,
    alignItems: "flex-end",
    // alignContent: "flex-start",

    justifyContent: "flex-start",
  },
});
