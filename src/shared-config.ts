import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export const colors = {
  primary: "rgba(0, 107, 229, 1)",
  outline: "rgba(0, 107, 229, 1)",
  surface: "rgba(204, 228, 255, 1)",
  text: "rgba(0, 36, 77, 1)",
  textInputBorderColor: "rgba(190, 207, 218, 1)",
  textInputBG: "rgba(255, 255, 255, 1)",
  disabled: "rgba(157, 183, 200, 1)",
  radio: "rgba(222, 231, 237, 1)",
  active: "rgba(159, 96, 159, 1)",
};

export const gutter: number = 4;
export const borderRadius: number = 8;
export const inputHeight: number = 62;

export const borderSetup = {
  backgroundColor: colors.textInputBG,
  borderRadius: borderRadius,
  borderColor: colors.textInputBorderColor,
  borderWidth: 1,
};

export const offset: TextStyle = {
  textAlign: "right",
  marginTop: -(inputHeight + 5),
  marginRight: 25,
  fontSize: 12,
};

export const inputContainer: ViewStyle | TextStyle | ImageStyle = {
  flexDirection: "row",
  alignContent: "center",
  flex: 1,
  margin: 4,
  backgroundColor: colors.textInputBG,
  textAlign: "right",
  alignItems: "center",
  ...borderSetup,
  color: colors.text,
  height: inputHeight,
  // justifyContent: "flex-end",
};
