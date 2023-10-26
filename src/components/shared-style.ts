import { STATUS } from "../interfaces";
export const textColor = "rgba(37, 54, 65, 1)";

export const chipText = {
  fontSize: 12,
  lineHeight: 24,
};

const chipPadding: number = 15;
export const chipContainer = {
  paddingLeft: chipPadding,
  paddingRight: chipPadding,
  height: 40,
  margin: 4,
  borderWidth: 1,
};

export const priority = {
  [STATUS.ACTIVE]: {
    borderColor: "rgba(163, 245, 218, 1)",
    backgroundColor: "rgba(209, 250, 236, 1)",
  },
  [STATUS.RE_ACTIVE]: {
    borderColor: "rgba(163, 245, 218, 1)",
    backgroundColor: "rgba(209, 250, 236, 1)",
  },
  [STATUS.URGENT]: {
    borderColor: "rgba(255, 162, 153, 1)",
    backgroundColor: "rgba(255, 208, 204, 1)",
  },
  [STATUS.URGENT_EVAC]: {
    borderColor: "rgba(255, 162, 153, 1)",
    backgroundColor: "rgba(255, 208, 204, 1)",
  },
  [STATUS.NONE_URGENT_EVAC]: {
    borderColor: "rgba(255, 214, 102, 1)",
    backgroundColor: "rgba(255, 241, 102, 1)",
  },
  [STATUS.NONE_URGENT]: {
    borderColor: "rgba(255, 214, 102, 1)",
    backgroundColor: "rgba(255, 241, 102, 1)",
  },
  [STATUS.EVACUATED]: {
    borderColor: "rgba(174, 195, 209, 1)",
    backgroundColor: "rgba(222, 231, 237, 1)",
  },
};