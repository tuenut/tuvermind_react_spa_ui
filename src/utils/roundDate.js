export const roundDate = date => {
  // console.log(`start with ${date}`);
  let _date = new Date(date);

  const hours = [0, 3, 6, 9, 12, 15, 18, 21, 24];
  let more, less;

  for (let h of hours) {
    if (more === undefined && (h > date.getHours())) more = h;
    if (less === undefined && (h <= date.getHours())) less = h;
  }

  // console.log(`more:${more}; less:${less}`);

  const obj = {
    [more - date.getHours()]: more,
    [date.getHours() - less]: less
  };

  // console.log(obj);

  const closestHours = obj[Math.min(...Object.keys(obj))];

  // console.log(`closestHours ${closestHours}`);

  _date.setHours(closestHours);
  _date.setMinutes(0);
  _date.setSeconds(0);
  _date.setMilliseconds(0);

  // console.log(`rounded date ${_date}`);

  return new Date(_date)
};
