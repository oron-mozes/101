import _ from "lodash";
import {
  EAirWayTreatment,
  IAirWayInformation,
  TOGGLE,
} from "../../../../../../interfaces";

export function isSuccessful(successful?: boolean) {
  return !_.isNull(successful) && !_.isUndefined(successful)
    ? successful
      ? TOGGLE.YES
      : TOGGLE.NO
    : null;
}

export function allowToAddAction(
  actions: IAirWayInformation[],
  action?: IAirWayInformation
): boolean {
  if (!_.isNull(action?.action) && !_.isNull(action?.time)) {
    return true;
  }
  if (actions.length === 0 && !_.isNull(action?.id)) {
    return false;
  }
  return _.isNull(action?.id);
}
