export const listToObject__DEPRECATED__ = (array, idField = "id") =>
  Object.assign({}, ...Object.values(array).map(o => ({[o[idField]]: o})));

export const getDateTime = datetime => {
  const _dt = datetime ? new Date(datetime) : new Date();
  const
    year = _dt.getFullYear(),
    month = (_dt.getMonth() + 1).toString().padStart(2, "0"),
    day = _dt.getDate().toString().padStart(2, "0"),
    time = _dt.toTimeString().split(":").slice(0, 2).join(":")
  ;

  return {
    date: `${year}-${month}-${day}`,
    time: time,
    _object: _dt
  }
};

export const random = (max, min = 0, precision = 0) => (precision > 0)
  ? parseFloat((Math.random() * (max - min) + min).toPrecision(precision))
  : Math.floor(Math.random() * Math.floor(max - min) + min);

export const range = (from, size) => (
  size > 0
    ? [...Array(size).keys()].map(i => i + from)
    : [...Array(Math.abs(size)).keys()].map(i => i + from + size)
);

export class DateTime {
  constructor(dateObject) {
    this._object = dateObject ? new Date(dateObject) : new Date();

    const [UTCdate, UTCtime] = this._object.toISOString().split("T");
    this.UTCdate = UTCdate;
    this.UTCtime = UTCtime;

    this.localDate = this._object.toLocaleDateString("ru");
    this.localTime = this._object.toLocaleTimeString("ru");
  }
}

DateTime.prototype.toString = function () {
  return this.localDate;
};

export const convertResponseDataToStoreObject = (data, keyField = "id") =>
  Object.assign({}, ...data.map((x) => ({[x[keyField]]: x})));

export const convertStoreObjectToArray = (data, sortByField = "id") => {
  if (!data || Object.values(data).length === 0)
    return [];

  return Object.values(data)
    .sort(
      (item1, item2) => {
        if (item1[sortByField] > item2[sortByField]) {
          return 1;
        }
        if (item1[sortByField] < item2[sortByField]) {
          return -1;
        }

        return 0;
      }
    );
};