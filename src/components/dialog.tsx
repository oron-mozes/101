import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useTranslation } from "../hooks/useMyTranslation";

export function DialogWrapper({
  visible,
  onClose,
  onConfirm,
  title,
  testId = "",
  description,
}: {
  visible: boolean;
  title: string;
  testId?: string;
  description?: string;
  onClose(): void;
  onConfirm(): void;
}) {
  const translation = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title testID={`${testId}${testId ? "-" : ""}dialog-title`}>
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Text
            variant="bodyMedium"
            testID={`${testId}${testId ? "-" : ""}dialog-description`}
          >
            {description}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "flex-start" }}>
          <Button
            onPress={onConfirm}
            mode="contained"
            testID={`${testId}${testId ? "-" : ""}dialog-confirm`}
          >
            {translation("confirm")}
          </Button>
          <Button
            onPress={onClose}
            testID={`${testId}${testId ? "-" : ""}dialog-cancel`}
          >
            {translation("cancel")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
