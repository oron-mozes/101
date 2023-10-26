export const timeToDate = (date?: Date) => {
  if (!date) {
    return "";
  }
  const time = new Date(date);
  const minutes = time.getUTCMinutes();

  return `${time.getUTCHours()}:${
    minutes.toString().length === 1 ? `0${minutes}` : minutes
  }`;
};
