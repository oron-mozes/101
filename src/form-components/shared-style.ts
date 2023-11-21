import { TextStyle } from "react-native";
import { STATUS } from "../interfaces";
export const textColor = "rgba(37, 54, 65, 1)";

export const chipText: TextStyle = {
  fontSize: 12,
  lineHeight: 24,
  flex: 1,
  marginLeft: 0,
  textAlign: "center",
 
};

const chipPadding: number = 0;
export const chipContainer = {
  flex: 1,
  paddingLeft: chipPadding,
  paddingRight: chipPadding,
  height: 48,
  margin: 4,

  borderWidth: 1,
};

export const priority = {
  [STATUS.ACTIVE]: {
    borderColor: "rgba(163, 245, 218, 1)",
    backgroundColor: "rgba(209, 250, 236, 1)",
  },

  [STATUS.URGENT]: {
    borderColor: "rgba(255, 162, 153, 1)",
    backgroundColor: "rgba(255, 208, 204, 1)",
  },

  [STATUS.TO_EVAC]: {
    borderColor: "rgba(255, 214, 102, 1)",
    backgroundColor: "rgba(255, 241, 102, 1)",
  },

  [STATUS.NEW_PATIENT]: {
    borderColor: "rgba(174, 195, 209, 1)",
    backgroundColor: "rgba(222, 231, 237, 1)",
  },
  [STATUS.CLOSED]: {
    borderColor: "rgba(196, 145, 84, 1)",
    backgroundColor: "rgba(242, 230, 217, 1)",
  },
};
