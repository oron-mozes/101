import { compress, trimUndefinedRecursively } from "compress-json";
import { IPatientRecord } from "../../interfaces";
import _ from "lodash";

function removeNulls(obj) {
  return _.transform(obj, (result, value, key) => {
    if (_.isObject(value)) {
      result[key] = removeNulls(value); // Recursively call removeNulls for nested objects.
    } else if (!_.isNull(value)) {
      result[key] = value; // Keep non-null values.
    }
  });
}
export function getByteSize(str) {
  // Use the `Buffer` class in Node.js
  if (typeof Buffer === "function") {
    return Buffer.from(str).length;
  }

  // For Expo or browser environments, you can use Blob
  if (typeof Blob === "function") {
    const blob = new Blob([str]);
    return blob.size;
  }

  // Fallback for environments that do not support Buffer or Blob
  // This may not be as accurate, especially for non-ASCII characters
  return str.length * 2;
}

export function splicePatient(patient: IPatientRecord) {
  const buckets: any[] = [];
  let temp = {};

  for (const key in patient) {
    const maxString = JSON.stringify({ ...temp, [key]: patient[key] });

    if (maxString.length > 1800) {
      const partialData = {
        id: patient.personal_information.patientId,
        data: temp,
        part: buckets.length,
      };
      removeNulls(partialData);

      const decodedPatient = compress({ partialData });

      buckets.push(decodedPatient);
      temp = { [key]: patient[key] };
    } else {
      temp = { ...temp, [key]: patient[key] };
    }
  }

  if (Object.keys(temp).length !== 0) {
    const partialData = {
      id: patient.personal_information.patientId,
      data: temp,
      part: buckets.length,
      isLast: true,
    };

    removeNulls(partialData);
    const decodedPatient = compress({ partialData });

    buckets.push(decodedPatient);
  }
  return buckets;
}
