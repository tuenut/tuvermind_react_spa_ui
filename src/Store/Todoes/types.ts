import {AxiosResponse} from "axios";

import {IBaseAction, IBaseStateWithApi} from "../types";
import {
  TODOES_GET_LIST_ACTION,
  TODOES_GET_LIST_ON_FAILURE_ACTION,
  TODOES_GET_LIST_ON_SUCCESS_ACTION,
  TODOES_GET_LIST_START_LOADING_ACTION,
  TODOES_GET_LIST_STOP_LOADING_ACTION
} from "./actions";

export interface IGetTodoesList extends IBaseAction {
  type: typeof TODOES_GET_LIST_ACTION
  options: object
}

export interface IGetTodoesListStartLoading {
  type: typeof TODOES_GET_LIST_START_LOADING_ACTION
}

export interface IGetTodoesListStopLoading {
  type: typeof TODOES_GET_LIST_STOP_LOADING_ACTION
}

export interface IGetTodoesListOnSuccess {
  type: typeof TODOES_GET_LIST_ON_SUCCESS_ACTION,
  response: AxiosResponse,
}

export interface IGetTodoesListOnFailure {
  type: typeof TODOES_GET_LIST_ON_FAILURE_ACTION,
  error: object,
}

export type GetTodoesListActions =
  | IGetTodoesList
  | IGetTodoesListStartLoading
  | IGetTodoesListStopLoading
  | IGetTodoesListOnSuccess
  | IGetTodoesListOnFailure
  ;


export interface ITodoesListState extends IBaseStateWithApi {
  data: null | TodoListType,
}

export type TypeOfTodoType = "MEMO" | "TODO" | "CRON";
export type TodoStatusType = "suspense" | "inProcess" | "done" | "expired" | "archived";
export type CronScheduleType = string;

export interface IBaseTodo {
  id: number,
  status: TodoStatusType,
  type: TypeOfTodoType,
  title: string,
  description: string | null,
  duration: number | null,
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

export type TodoListType = Array<IMemoTodo | ITodo | ICronTodo>;

export interface ITodoesState {
  list: ITodoesListState
}