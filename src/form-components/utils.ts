export function calcBloodPressureValue(value: string, newValue: string) {
  if (value?.[value?.length - 1] === "/" && newValue.indexOf("/") === -1) {
    newValue = newValue.substring(0, newValue.length - 1);
  }
  let subStrIndex = 2;
  let maxLength = 2;
  if (newValue.startsWith("1")) {
    subStrIndex = 3;
    maxLength = 3;
  }
  if (newValue.indexOf("/") === -1 && newValue.length >= maxLength) {
    newValue = `${newValue.substring(0, subStrIndex)}/${newValue.substring(
      subStrIndex
    )}`;
  }
  return newValue;
}
