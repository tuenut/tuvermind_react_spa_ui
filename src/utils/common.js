export const listToObject = (array, idField = "id") =>
  Object.assign({}, ...Object.values(array).map(o => ({[o[idField]]: o})));