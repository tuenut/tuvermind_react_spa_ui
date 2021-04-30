import {IBaseTodo, TodoDataTypes} from "./types";


export const MEMO = "MEMO";
export const TODO = "TODO";
export const CRON = "CRON";

export const createTodoDataObject =
  (data: IBaseTodo & Partial<TodoDataTypes>): TodoDataTypes | undefined => {
    const baseTodoObject: IBaseTodo = {
      id: data.id || null,
      status: data.status || "suspense",
      type: data.type || TODO,
      title: data.title || "",
      description: data.description || "",
      updated: data.updated || null,
      created: data.created || null,
      duration: data.duration || null
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