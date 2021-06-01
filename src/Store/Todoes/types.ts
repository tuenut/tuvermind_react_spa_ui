import { IBaseApiListState } from "../../libs/redux/types";

import { DateTime } from "luxon";


export const PENDING = "pending";
export const IN_PROCESS = "inProcess";
export const COMPLETED = "completed";
export const ARCHIVED = "archived";
export const EXPIRED = "expired";
export const SUSPENSE = "suspense";

export type TodoStatusType =
  | typeof PENDING
  | typeof IN_PROCESS
  | typeof COMPLETED
  | typeof ARCHIVED
  | typeof EXPIRED
  | typeof SUSPENSE
  ;

export interface ITodoReminderFromApi {
  id: number,
  when: string
}

export interface ITodoReminder {
  id?: number,
  when: DateTime
}

export interface ITodoEditablePart {
  id: number | null,
  title: string,
  description: string,
  start_date: DateTime | null,
  start_time: DateTime | null,
  duration: number | null,
  reminders: ITodoReminder[],
  status?: TodoStatusType,
  created?: DateTime,
  updated?: DateTime | null,
  completed?: DateTime | null
}

export interface ITodo extends ITodoEditablePart {
  status: TodoStatusType,
  created: DateTime,
  updated: DateTime | null,
  completed: DateTime | null
}

export interface ITodoFromApi {
  id: number,
  title: string,
  description: string,
  start_date: string,
  start_time: string | null,
  duration: number | null,
  status: TodoStatusType,
  created: string,
  updated: string | null,
  completed: string | null
  reminders: ITodoReminderFromApi[],
}

export type TodoType = ITodo | ITodoFromApi;

export interface ITodoesData {
  [id: number]: ITodoFromApi
}

// STATE
export interface ITodoesListState extends IBaseApiListState {
  data: ITodoesData,
}

