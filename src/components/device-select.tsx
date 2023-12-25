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
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title testID={`${testId}${testId ? "-" : ""}dialog-title`}>
          {translation("transformTitle")}
        </Dialog.Title>
        <Dialog.Content>
          <Text
            variant="bodyMedium"
            testID={`${testId}${testId ? "-" : ""}dialog-description`}
          >
            {translation("transformDescription")}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "flex-start" }}>
          <Button
            onPress={() => onSelect("card")}
            mode="contained"
            testID={`${testId}${testId ? "-" : ""}dialog-confirm`}
          >
            {translation("cardSelection")}
          </Button>
          <Button
            onPress={() => onSelect("device")}
            testID={`${testId}${testId ? "-" : ""}dialog-cancel`}
          >
            {translation("deviceSelection")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
