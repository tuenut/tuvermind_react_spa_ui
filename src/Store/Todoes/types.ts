import { IBaseApiListState } from "../../libs/redux/types";


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

export interface ITodoReminder {
  id?: number,
  when: string
}

interface ITodoEditablePart {
  title: string,
  description: string,
  start_date: string | null,
  start_time: string | null,
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

