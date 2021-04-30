import {IBaseStateWithApi} from "../types";
import {CRON, MEMO, TODO} from "./state";


// STATE
export interface ITodoesListState extends IBaseStateWithApi {
  data: null | ITodoesData,
}

export type TodoType =
  | typeof MEMO
  | typeof TODO
  | typeof CRON
  ;

export type TodoStatusType =
  | "suspense"
  | "inProcess"
  | "done"
  | "expired"
  | "archived"
  ;

export type CronScheduleType = string;

export interface IBaseTodo {
  id: number | null,
  status: TodoStatusType,
  type: TodoType,
  title: string,
  description: string | null,
  duration: number | null,
  created: number | null,
  updated: number | null,
}

export interface IMemoTodo extends IBaseTodo {
  type: "MEMO",
  date: number | null,
}

export interface ITodo extends IBaseTodo {
  type: "TODO",
  date: number | null,
}

export interface ICronTodo extends IBaseTodo {
  type: "CRON",
  schedule: CronScheduleType,
}

export type TodoDataTypes = IMemoTodo | ITodo | ICronTodo

export interface ITodoesData {
  [id: number]: TodoDataTypes
}

export type TodoesListType = Array<TodoDataTypes>;

export interface ITodoesState {
  list: ITodoesListState
}
