export function convertToTime(time) {
  if (time === 0) {
    return "אין מידע";
  }
  const date = new Date(time);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const finalDate = new Date(time - userTimezoneOffset);

  return `${finalDate.getUTCHours()}:${`0${finalDate.getUTCMinutes()}`.slice(
    -2
  )}`;
}
