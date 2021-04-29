import {
  IBaseAction,
  IBaseApiCreateRequestAction,
  IBaseApiDeleteRequestAction,
  IBaseApiListRequestAction,
  IBaseApiOnFailureAction,
  IBaseApiOnSuccessAction, IBaseApiRetrieveRequestAction,
  IBaseApiUpdateRequestAction
} from "../../types";
import {TodoDataTypes} from "../types";


export const TODOES_START_LOADING_ACTION = "TODOES_GET_LIST_START_LOADING_ACTION";
export const TODOES_STOP_LOADING_ACTION = "TODOES_GET_LIST_STOP_LOADING_ACTION";

export const TODOES_GET_LIST_ACTION = "TODOES_GET_LIST_ACTION";
export const TODOES_GET_LIST_ON_SUCCESS_ACTION = "TODOES_GET_LIST_ON_SUCCESS_ACTION";
export const TODOES_GET_LIST_ON_FAILURE_ACTION = "TODOES_GET_LIST_ON_FAILURE_ACTION";

export const TODOES_UPDATE_LIST_ACTION = "TODOES_UPDATE_LIST_ACTION";
export const TODOES_UPDATE_LIST_ON_SUCCESS_ACTION = "TODOES_UPDATE_LIST_ON_SUCCESS_ACTION";
export const TODOES_UPDATE_LIST_ON_FAILURE_ACTION = "TODOES_UPDATE_LIST_ON_FAILURE_ACTION";

export const TODOES_RETRIEVE_ACTION = "TODOES_RETRIEVE_ACTION";
export const TODOES_RETRIEVE_ON_SUCCESS_ACTION = "TODOES_RETRIEVE_ON_SUCCESS_ACTION";
export const TODOES_RETRIEVE_ON_FAILURE_ACTION = "TODOES_RETRIEVE_ON_FAILURE_ACTION";

export const TODOES_CREATE_ACTION = "TODOES_CREATE_ACTION";
export const TODOES_CREATE_ON_SUCCESS_ACTION = "TODOES_CREATE_ON_SUCCESS_ACTION";
export const TODOES_CREATE_ON_FAILURE_ACTION = "TODOES_CREATE_ON_FAILURE_ACTION";

export const TODOES_UPDATE_ACTION = "TODOES_UPDATE_ACTION";
export const TODOES_UPDATE_ON_SUCCESS_ACTION = "TODOES_UPDATE_ON_SUCCESS_ACTION";
export const TODOES_UPDATE_ON_FAILURE_ACTION = "TODOES_UPDATE_ON_FAILURE_ACTION";

export const TODOES_DELETE_ACTION = "TODOES_DELETE_ACTION";
export const TODOES_DELETE_ON_SUCCESS_ACTION = "TODOES_DELETE_ON_SUCCESS_ACTION";
export const TODOES_DELETE_ON_FAILURE_ACTION = "TODOES_DELETE_ON_FAILURE_ACTION";

export const TODOES_COMPLETE_TASK_ACTION = "TODOES_COMPLETE_TASK_ACTION";
export const TODOES_COMPLETE_TASK_ON_SUCCESS_ACTION = "TODOES_COMPLETE_TASK_ON_SUCCESS_ACTION";
export const TODOES_COMPLETE_TASK_ON_FAILURE_ACTION = "TODOES_COMPLETE_TASK_ON_FAILURE_ACTION";

export const TODOES_CLEAR_LIST_ACTION = "TODOES_CLEAR_LIST_ACTION";


export interface ITodoesStartLoadingAction
  extends IBaseAction<typeof TODOES_START_LOADING_ACTION> {
}

export interface ITodoesStopLoadingAction
  extends IBaseAction<typeof TODOES_STOP_LOADING_ACTION> {
}

export interface ITodoesGetListAction
  extends IBaseApiListRequestAction<typeof TODOES_GET_LIST_ACTION> {
}

export interface IGetTodoesListOnSuccessAction
  extends IBaseApiOnSuccessAction<typeof TODOES_GET_LIST_ON_SUCCESS_ACTION> {
}

export interface IGetTodoesListOnFailureAction
  extends IBaseApiOnFailureAction<typeof TODOES_GET_LIST_ON_FAILURE_ACTION> {
}

export interface ICreateTodoAction
  extends IBaseApiCreateRequestAction<typeof TODOES_CREATE_ACTION, TodoDataTypes> {
}

export interface ICreateTodoOnSuccessAction
  extends IBaseApiOnSuccessAction<typeof TODOES_CREATE_ON_SUCCESS_ACTION> {
}

export interface ICreateTodoOnFailureAction
  extends IBaseApiOnFailureAction<typeof TODOES_CREATE_ON_FAILURE_ACTION> {
}

export interface IUpdateTodoAction
  extends IBaseApiUpdateRequestAction<typeof TODOES_UPDATE_ACTION, TodoDataTypes> {
}

export interface IUpdateTodoOnSuccessAction
  extends IBaseApiOnSuccessAction<typeof TODOES_UPDATE_ON_SUCCESS_ACTION> {
}

export interface IUpdateTodoOnFailureAction
  extends IBaseApiOnFailureAction<typeof TODOES_UPDATE_ON_FAILURE_ACTION> {
}

export interface IDeleteTodoAction
  extends IBaseApiDeleteRequestAction<typeof TODOES_DELETE_ACTION> {
}

export interface IDeleteTodoOnSuccessAction
  extends IBaseApiOnSuccessAction<typeof TODOES_DELETE_ON_SUCCESS_ACTION> {
}

export interface IDeleteTodoOnFailureAction
  extends IBaseApiOnFailureAction<typeof TODOES_DELETE_ON_FAILURE_ACTION> {
}

export interface ICompleteTodoAction
  extends IBaseApiRetrieveRequestAction<typeof TODOES_COMPLETE_TASK_ACTION> {
  extraAction: 'complete'
}

export interface ICompleteTodoOnSuccessAction
  extends IBaseApiOnSuccessAction<typeof TODOES_COMPLETE_TASK_ON_SUCCESS_ACTION> {
}

export interface ICompleteTodoOnFailureAction
  extends IBaseApiOnFailureAction<typeof TODOES_COMPLETE_TASK_ON_FAILURE_ACTION> {
}

export type TodoesActions =
  | ITodoesGetListAction
  | ITodoesStartLoadingAction
  | ITodoesStopLoadingAction
  | IGetTodoesListOnSuccessAction
  | IGetTodoesListOnFailureAction
  | IUpdateTodoAction
  | IUpdateTodoOnSuccessAction
  | IUpdateTodoOnFailureAction
  | IDeleteTodoAction
  | IDeleteTodoOnSuccessAction
  | IDeleteTodoOnFailureAction
  | ICompleteTodoAction
  | ICompleteTodoOnSuccessAction
  | ICompleteTodoOnFailureAction
  ;

export type ITodoesErrorActions =
  | IGetTodoesListOnFailureAction
  | IUpdateTodoOnFailureAction
  | IDeleteTodoOnFailureAction
  | ICompleteTodoOnFailureAction
  ;