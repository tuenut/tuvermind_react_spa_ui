export interface ISplitArrayToColumns {
  (array: any[], cols: number): Array<any[]>
}

export const splitArrayToColumns: ISplitArrayToColumns = (array_, columnsCount = 1) => {
  let columns = Array.from(new Array(columnsCount), () => new Array(0));

  let counter = 0;
  for (const item of array_) {
    columns[counter].push(item);
    counter += 1;
    if (counter === (columnsCount)) counter = 0;
  }

  return columns;
};