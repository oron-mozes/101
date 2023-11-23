import _ from "lodash";
import { TOGGLE } from "../../../../../../interfaces";

export function isSuccessful(successful?: boolean) {
  return !_.isNull(successful) && !_.isUndefined(successful)
    ? successful
      ? TOGGLE.YES
      : TOGGLE.NO
    : null;
}
