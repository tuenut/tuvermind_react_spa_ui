export const roundDate = date => {
  let _date = new Date(date);

  const hours = [0, 3, 6, 9, 12, 15, 18, 21, 24];
  let more, less;

  for (let h of hours) {
    if (more === undefined && (h > date.getHours())) more = h;
    if (more === undefined && (h < date.getHours())) less = h;
  }

  const obj = {
    [more - date.getHours()]: more,
    [date.getHours() - less]: less
  };

  _date.setHours(obj[Math.min(...Object.keys(obj))]);
  _date.setMinutes(0);
  _date.setSeconds(0);
  _date.setMilliseconds(0);

  return new Date(_date)
};
