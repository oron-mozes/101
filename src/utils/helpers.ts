import _ from "lodash";
import locale from "../../locales/he.json";
import { timeToDate } from "./date-to-time";
import date from "date-and-time";

function convertor(key, value) {
  switch (key) {
    case "injury_time":
    case "care_time":
    case "time":
    case "order_time":
    case "execution_time":
      return timeToDate(value);
    case "date":
      return date.format(new Date(value), "DD/MM/YY");
    default:
      return locale[value] ?? value;
  }
}

export function getLocaleKey(data) {
  if (Array.isArray(data)) {
    return data.map((value) => {
      if (_.isObject(value)) {
        return getLocaleKey(value);
      }

      return locale[value] ?? value;
    });
  }

  const res = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      res[locale[key]] = getLocaleKey(data[key]);
    } else if (_.isObject(data[key])) {
      console.log({ key });
      res[locale[key]] = getLocaleKey(data[key]);
    } else {
      res[locale[key]] = convertor(key, data[key]);
    }
  }

  return res;
}
