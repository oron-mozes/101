import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { textColor } from "./shared-style";

export interface ICheckButton {
  onSelect(e: any): void;
  label: string;
  disabled?: boolean;
  checked?: boolean;
}
export function CheckButton({
  label,
  onSelect,
  disabled = false,
  checked = false,
}: ICheckButton) {
  return (
    <Button
      mode="contained"
      onPress={(e) => {
        console.log("CLICK");
        onSelect(e);
      }}
      disabled={disabled}
      style={[styles.container, checked ? styles.checked : {}]}
      textColor={checked ? "#fff" : textColor}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  checked: {
    backgroundColor: "rgba(159, 96, 159, 1)",
    color: "#fff",
  },
  container: {
    backgroundColor: "rgba(222, 231, 237, 1)",
    borderRadius: 20,
    margin: 4,
  },
});
