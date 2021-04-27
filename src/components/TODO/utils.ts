import {CRON, IBaseTodo, ICronTodo, IMemoTodo, ITodo, MEMO, TODO} from "../../Store/Todoes/types";

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


export const createTodoDataObject =
  (data: IBaseTodo & Partial<IMemoTodo | ITodo | ICronTodo>): IMemoTodo | ITodo | ICronTodo | undefined => {
    const baseTodoObject: IBaseTodo = {
      id: data.id,
      status: data.status,
      type: data.type,
      title: data.title,
      description: data.description,
      updated: data.updated,
      created: data.created,
      duration: data.duration
    };
    switch (data.type) {
      case TODO:
        return ({
          ...baseTodoObject,
          type: TODO,
          date: data.date || null
        });

      case MEMO:
        return ({
          ...baseTodoObject,
          type: MEMO,
          date: data.date || null
        });

      case CRON:
        return ({
          ...baseTodoObject,
          type: CRON,
          schedule: data.schedule || ""
        });

      default:
        return undefined;
    }
  };