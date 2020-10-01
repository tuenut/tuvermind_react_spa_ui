export const listToObject = (array, idField = "id") =>
  Object.assign({}, ...Object.values(array).map(o => ({[o[idField]]: o})));

export const getDateTime = datetime => {
  const _dt = datetime ? new Date(datetime) : new Date();
  const
    year = _dt.getFullYear(),
    month = (_dt.getMonth()+1).toString().padStart(2, "0"),
    day = _dt.getDate().toString().padStart(2, "0"),
    time = _dt.toTimeString().split(":").slice(0, 2).join(":")
  ;

  return {
    date: `${year}-${month}-${day}`,
    time: time,
    _object: _dt
  }
};
