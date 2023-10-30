import { IPatientRecord } from "../../interfaces";
import _ from "lodash";
import { coding } from "./codingLegend";
export function decode(data) {
  if (!_.isObject(data) && !_.isArray(data)) {
    return data;
  }
  let finalData = [];
  for (const key in data) {
    //[[1, 16], null]
    const value = decode(data[key]);
    if (value) {
      if (!_.isArray(value)) {
        finalData.push([[coding.get(key)], value]);
      } else if (_.isArray(value)) {
        for (const item of value) {
          if (!key.match(/[a-zA-Z]/g)) {
            item[0].push(Number(key));
            item[0] = [item[0]];
          } else {
            item[0].push(coding.get(key));
          }
        }
        finalData = finalData.concat(value);
      }
    }
  }
  return finalData;
}
