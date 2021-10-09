import { DateTime } from "luxon";
import { PaginatedApiResponse } from "../../../types";
import { AxiosResponse } from "axios";

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

/** API PART
 */
export interface ITodoReminderFromApi {
  id?: number,
  when: string
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

/** Runtime part
 */
export interface ITodoReminderObject {
  id?: number,
  when: DateTime
}

export interface ITodoObject {
  id: number,
  title: string,
  description: string,
  startDate: DateTime | null,
  startTime: DateTime | null,
  duration: number | null,
  reminders: ITodoReminderObject[],
  status: TodoStatusType,
  created: DateTime,
  updated: DateTime | null,
  completed: DateTime | null
}


export type TodoesListResponseType = AxiosResponse<PaginatedApiResponse<ITodoFromApi>>;