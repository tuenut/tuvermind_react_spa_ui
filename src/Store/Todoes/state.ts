import {ITodo} from "./types";


export const PENDING = "pending";
export const IN_PROCESS = "inProcess";
export const COMPLETED = "completed";
export const ARCHIVED = "archived";
export const EXPIRED = "expired";
export const SUSPENSE = "suspense";

export const createTodoDataObject = (data: ITodo): ITodo => ({
  id: data.id || null,
  title: data.title || "",
  description: data.description || "",
  start_date: data.start_date || null,
  duration: data.duration || null,
  status: data.status || PENDING,
  reminders: data.reminders || [],
  created: data.created || null,
  updated: data.updated || null,
  completed: data.completed || null,
});