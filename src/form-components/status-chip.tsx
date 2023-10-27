import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { STATUS } from "../interfaces";
import { chipContainer, chipText, priority } from "./shared-style";

export interface IStatusChipProps {
  status: STATUS;
  label: string;
}
export function StatusChip({ label, status }: IStatusChipProps) {
  return (
    <Chip style={[styles.container, priority[status]]} textStyle={styles.text}>
      {label}
    </Chip>
  );
}

const styles = StyleSheet.create({
  text: {
    ...chipText,
  },
  container: {
    ...chipContainer,
  },
});
