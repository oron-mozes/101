import _ from "lodash";
import { IAction, TOGGLE } from "../../../../../../interfaces";

export function isSuccessful(successful?: boolean) {
  return !_.isNull(successful) && !_.isUndefined(successful)
    ? successful
      ? TOGGLE.YES
      : TOGGLE.NO
    : null;
}

export function allowToAddAction<T>(
  actions: IAction<T>[],
  action?: IAction<T>
): boolean {
  if (!_.isNull(action?.action) && !_.isNull(action?.time)) {
    return true;
  }
  if (actions.length === 0 && !_.isNull(action?.id)) {
    return false;
  }
  return _.isNull(action?.id);
}
