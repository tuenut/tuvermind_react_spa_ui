import {IBaseApiListState} from "../../libs/redux/types";


export type TodoStatusType =
  | "pending"
  | "inProcess"
  | "completed"
  | "archived"
  | "expired"
  | "suspense"
  ;

export type CronScheduleType = string;

export interface ITodo {
  id: number | null,
  title: string,
  description: string,
  start_date: string | null,
  duration: number | null,
  status: TodoStatusType,
  reminders: [],
  created: string | null,
  updated: string | null,
  completed: string | null
}

export interface ITodoesData {
  [id: number]: ITodo
}

// STATE
export interface ITodoesListState extends IBaseApiListState {
  data: ITodoesData,
}

