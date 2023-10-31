import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Modal, Portal } from "react-native-paper";
import { ToggleButton } from "../../form-components/ToggleButton";
import { InputField } from "../../form-components/input-field";
import { TimePicker } from "../../form-components/time-picker";
import { useTranslation } from "../../hooks/useMyTranslation";
import { colors } from "../../shared-config";

export function InjuryModal({
  closeHandler,
  onChange,
}: {
  onChange(value): void;
  closeHandler(): void;
}) {
  const translation = useTranslation();
  const [data, setData] = useState<{
    gunshot: number;
    sharpnel: number;
    touniquet: boolean;
    touniquet_time: number;
  }>({
    gunshot: null,
    sharpnel: null,
    touniquet: null,
    touniquet_time: null,
  });

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={() => {
          onChange(data);
          closeHandler();
        }}
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
          backgroundColor: colors.textInputBG,
        }}
      >
        <View style={styles.content}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <InputField
              disabled={false}
              label={translation("gunshots")}
              numeric
              value={data?.gunshot?.toString()}
              onChange={(gunshot) => {
                setData({ ...data, gunshot: Number(gunshot) });
              }}
            />

            <InputField
              disabled={false}
              label={translation("hits")}
              numeric
              value={data.sharpnel?.toString()}
              onChange={(sharpnel) => {
                setData({ ...data, sharpnel: Number(sharpnel) });
              }}
            />
          </View>

          <Divider style={{ flex: 1, marginTop: 10, marginBottom: 10 }} />

          <ToggleButton
            disabled={false}
            status={data.touniquet}
            label={translation("TH")}
            onSelect={(touniquet: boolean) => {
              setData({ ...data, touniquet });
            }}
          />
          {data?.touniquet && (
            <TimePicker
              disabled={false}
              value={data.touniquet_time}
              label={translation("TH_time")}
              onChange={(touniquet_time: number) => {
                setData({ ...data, touniquet_time });
              }}
            />
          )}

          <View style={{ flex: 1 }} />
          <Button
            onPress={() => {
              onChange(data);
              closeHandler();
            }}
          >
            {translation("continue")}
          </Button>
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
