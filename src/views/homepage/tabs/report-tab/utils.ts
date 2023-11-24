import * as Application from "expo-application";


export function generateId(unit_name: string) {
  return `${new Date().getTime()}|${Application.androidId}|${unit_name}`;
}

