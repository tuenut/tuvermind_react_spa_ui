import { IBaseApiListState } from "../../libs/redux/types";


export type TodoStatusType =
  | "pending"
  | "inProcess"
  | "completed"
  | "archived"
  | "expired"
  | "suspense"
  ;

export interface ITodoReminder {
  value: number,
  units: "min" | "hour" | "day" | "week"
}

interface ITodoEditablePart {
  title: string,
  description: string,
  start_date: string | null,
  duration: number | null,
  reminders: ITodoReminder[],
}

export interface ITodoInEditor extends ITodoEditablePart {
  id: number | null,
}

export interface ITodoFromApi extends ITodoEditablePart {
  id: number,
  status: TodoStatusType,
  created: string | null,
  updated: string | null,
  completed: string | null
}

export type TodoType = ITodoInEditor | ITodoFromApi;

export interface ITodoesData {
  [id: number]: ITodoFromApi
}

// STATE
export interface ITodoesListState extends IBaseApiListState {
  data: ITodoesData,
}

