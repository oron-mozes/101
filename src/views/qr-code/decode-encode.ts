import { IPatientRecord } from "../../interfaces";
import _ from "lodash";
import { coding } from "./codingLegend";
import jsonpointer from "jsonpointer";

export function encode(data) {
  if (!_.isObject(data) && !_.isArray(data)) {
    return data;
  }
  let finalData = [];
  for (const key in data) {
    const value = encode(data[key]);
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
const reverseCodingMap: Map<number, string> = new Map([]);

function mirrorCodingMap() {
  if (reverseCodingMap.size !== 0) {
    return;
  }
  for (const code of coding.keys()) {
    reverseCodingMap.set(coding.get(code), code);
  }
}

export const generatePath = (hints: any[]): string => {
  let path = [];
  mirrorCodingMap();
  while (hints.length !== 0) {
    const nestedItem = hints.pop();
    if (_.isArray(nestedItem)) {
      const arrIndex = nestedItem.pop();
      path.push(arrIndex);
      path.push(generatePath(nestedItem));
    } else {
      path.push(reverseCodingMap.get(nestedItem));
    }
  }
  return path.join("/");
};
export function decode(encodedData): Partial<IPatientRecord> {
  const patient = {};
  for (const row in encodedData) {
    const path = generatePath(encodedData[row][0]);
    const value = encodedData[row][1];
    jsonpointer.set(patient, `/${path}`, value);
  }

  return patient;
}
