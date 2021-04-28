import {AxiosResponse} from "axios";

import {
  IBaseAction,
  IBaseStateWithApi,
  IBaseApiUpdateAction,
  IBaseApiOnSuccessAction,
  IBaseApiOnFailureAction
} from "../types";
import {
  TODOES_GET_LIST_ACTION,
  TODOES_GET_LIST_ON_FAILURE_ACTION,
  TODOES_GET_LIST_ON_SUCCESS_ACTION,
  TODOES_START_LOADING_ACTION,
  TODOES_STOP_LOADING_ACTION,
  TODOES_UPDATE_ACTION,
  TODOES_UPDATE_ON_SUCCESS_ACTION,
  TODOES_UPDATE_ON_FAILURE_ACTION,
} from "./actions";


// STATE
export interface ITodoesListState extends IBaseStateWithApi {
  data: null | ITodoesData,
}

export const MEMO = "MEMO";
export const TODO = "TODO";
export const CRON = "CRON";
export type TodoType =
  | typeof MEMO
  | typeof TODO
  | typeof CRON
  ;
export type TodoStatusType = "suspense" | "inProcess" | "done" | "expired" | "archived";
export type CronScheduleType = string;

export interface IBaseTodo {
  id: number,
  status: TodoStatusType,
  type: TodoType,
  title: string,
  description: string | null,
  duration: number | null,
  created: number,
  updated: number,
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

export type TodoTypes = IMemoTodo | ITodo | ICronTodo

export interface ITodoesData {
  [id: number]: TodoTypes
}

export type TodoesListType = Array<TodoTypes>;

export interface ITodoesState {
  list: ITodoesListState
}


// GET LIST
export interface IGetTodoesList
  extends IBaseAction<typeof TODOES_GET_LIST_ACTION> {
  options: object
}

export interface ITodoesStartLoading
  extends IBaseAction<typeof TODOES_START_LOADING_ACTION> {
}

export interface ITodoesStopLoading
  extends IBaseAction<typeof TODOES_STOP_LOADING_ACTION> {
}

export interface IGetTodoesListOnSuccess
  extends IBaseApiOnSuccessAction<typeof TODOES_GET_LIST_ON_SUCCESS_ACTION> {
}

export interface IGetTodoesListOnFailure
  extends IBaseApiOnFailureAction<typeof TODOES_GET_LIST_ON_FAILURE_ACTION> {
}


// UPDATE TODO-TASK
export interface IUpdateTodo extends IBaseApiUpdateAction<typeof TODOES_UPDATE_ACTION, TodoTypes> {
}

export interface IUpdateTodoOnSuccess extends IBaseAction {
  type: typeof TODOES_UPDATE_ON_SUCCESS_ACTION,
  response: AxiosResponse,
}

export interface IUpdateTodoOnFailure extends IBaseAction {
  type: typeof TODOES_UPDATE_ON_FAILURE_ACTION,
  error: object,
}

export type TodoesActions =
  | IGetTodoesList
  | ITodoesStartLoading
  | ITodoesStopLoading
  | IGetTodoesListOnSuccess
  | IGetTodoesListOnFailure
  | IUpdateTodo
  | IUpdateTodoOnSuccess
  | IUpdateTodoOnFailure
  ;

export type ITodoesErrorActions =
  | IGetTodoesListOnFailure
  | IUpdateTodoOnFailure
  ;


// DELETE TODO-TASK
export interface IDeleteTodo