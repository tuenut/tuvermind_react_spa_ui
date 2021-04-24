export type TypeOfTodoType = "MEMO" | "TODO" | "CRON";
export type TodoStatusType = "suspense" | "inProcess" | "done" | "expired" | "archived";
export type CronScheduleType = string;

export interface IBaseTodo {
  id: number,
  type: TypeOfTodoType,
  title: string,
  description: string | null,
  duration: number | null,
  status: TodoStatusType,
  created: number,
  updated: number,
}

export interface IMemoTodo extends IBaseTodo {
  type: "MEMO",
  date: number,
}

export interface ITodo extends IBaseTodo {
  type: "TODO",
  date: number,
}

export interface ICronTodo extends IBaseTodo {
  type: "CRON",
  schedule: CronScheduleType,
}