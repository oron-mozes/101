import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useTranslation } from "../hooks/useMyTranslation";
import { TDestination } from "../store/nfc.store";

export function DeviceSelectDialog({
  visible,
  onClose,
  onSelect,
  title,
  testId = "",
  description,
}: {
  visible: boolean;
  title: string;
  testId?: string;
  description?: string;
  onClose(): void;
  onSelect(destination: TDestination): void;
}) {
  const translation = useTranslation();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dialog.Title testID={`${testId}${testId ? "-" : ""}dialog-title`}>
          {translation("transformTitle")}
        </Dialog.Title>
        <Dialog.Content>
          <Button
            style={{ marginBottom: 20 }}
            labelStyle={{ fontSize: 18, paddingTop: 10, paddingBottom: 10 }}
            onPress={() => onSelect("card")}
            mode="contained"
            testID={`${testId}${testId ? "-" : ""}dialog-confirm`}
          >
            {translation("cardSelection")}
          </Button>
          <Button
            mode="outlined"
            labelStyle={{ fontSize: 16, paddingTop: 10, paddingBottom: 10 }}
            onPress={() => onSelect("device")}
            testID={`${testId}${testId ? "-" : ""}dialog-cancel`}
          >
            {translation("deviceSelection")}
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
