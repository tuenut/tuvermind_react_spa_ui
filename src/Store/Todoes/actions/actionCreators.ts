import {getActionCreator} from "../../../utils/reactActionsCreatorFactory";
import {
  IGetTodoesListAction,
  IGetTodoesListOnFailureAction,
  IGetTodoesListOnSuccessAction,
  ITodoesStartLoadingAction,
  ITodoesStopLoadingAction,
  IUpdateTodoAction,
  IUpdateTodoOnSuccessAction,
  IUpdateTodoOnFailureAction,
  TODOES_UPDATE_ON_FAILURE_ACTION,
  TODOES_GET_LIST_ACTION,
  TODOES_GET_LIST_ON_FAILURE_ACTION,
  TODOES_GET_LIST_ON_SUCCESS_ACTION,
  TODOES_START_LOADING_ACTION,
  TODOES_STOP_LOADING_ACTION,
  TODOES_UPDATE_ACTION,
  TODOES_UPDATE_ON_SUCCESS_ACTION,
  ICreateTodoAction,
  TODOES_CREATE_ACTION,
  ICreateTodoOnSuccessAction,
  TODOES_CREATE_ON_SUCCESS_ACTION,
  ICreateTodoOnFailureAction,
  TODOES_CREATE_ON_FAILURE_ACTION,
  IDeleteTodoAction,
  TODOES_DELETE_ACTION,
  IDeleteTodoOnSuccessAction,
  TODOES_DELETE_ON_SUCCESS_ACTION,
  IDeleteTodoOnFailureAction,
  TODOES_DELETE_ON_FAILURE_ACTION,
} from "./types";


export const getTodoesList =
  getActionCreator<IGetTodoesListAction>(
    TODOES_GET_LIST_ACTION,
    'options'
  );
export const getTodoesListStartLoading =
  getActionCreator<ITodoesStartLoadingAction>(
    TODOES_START_LOADING_ACTION
  );
export const getTodoesListStopLoading =
  getActionCreator<ITodoesStopLoadingAction>(
    TODOES_STOP_LOADING_ACTION
  );
export const getTodoesListOnSuccess =
  getActionCreator<IGetTodoesListOnSuccessAction>(
    TODOES_GET_LIST_ON_SUCCESS_ACTION,
    'response'
  );
export const getTodoesListOnFailure =
  getActionCreator<IGetTodoesListOnFailureAction>(
    TODOES_GET_LIST_ON_FAILURE_ACTION,
    'error'
  );
export const updateTodo =
  getActionCreator<IUpdateTodoAction>(
    TODOES_UPDATE_ACTION,
    'id', 'data'
  );
export const updateTodoOnSuccess =
  getActionCreator<IUpdateTodoOnSuccessAction>(
    TODOES_UPDATE_ON_SUCCESS_ACTION,
    'response'
  );
export const updateTodoOnFailure =
  getActionCreator<IUpdateTodoOnFailureAction>(
    TODOES_UPDATE_ON_FAILURE_ACTION,
    'error'
  );

export const createTodo =
  getActionCreator<ICreateTodoAction>(
    TODOES_CREATE_ACTION,
    'data'
  );

export const createTodoOnSuccess =
  getActionCreator<ICreateTodoOnSuccessAction>(
    TODOES_CREATE_ON_SUCCESS_ACTION,
    'response'
  );

export const createTodoOnFailure =
  getActionCreator<ICreateTodoOnFailureAction>(
    TODOES_CREATE_ON_FAILURE_ACTION,
    'error'
  );

export const deleteTodo =
  getActionCreator<IDeleteTodoAction>(
    TODOES_DELETE_ACTION,
    'id'
  );

export const deleteTodoOnSuccess =
  getActionCreator<IDeleteTodoOnSuccessAction>(
    TODOES_DELETE_ON_SUCCESS_ACTION,
    'response'
  );

export const deleteTodoOnFailure =
  getActionCreator<IDeleteTodoOnFailureAction>(
    TODOES_DELETE_ON_FAILURE_ACTION,
    'error'
  );