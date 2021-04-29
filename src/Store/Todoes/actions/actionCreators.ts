import {
  makeActionCreator,
  makeApiCreateAction,
  makeApiListAction,
  makeApiOnFailureAction,
  makeApiOnSuccessAction,
  makeDeleteAction,
  makeUpdateAction
} from "../../../libs/actionsCreatorFactory";
import {
  ITodoesGetListAction,
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
  TODOES_COMPLETE_TASK_ACTION,
  ICompleteTodoAction,
  ICompleteTodoOnSuccessAction,
  ICompleteTodoOnFailureAction,
  TODOES_COMPLETE_TASK_ON_SUCCESS_ACTION,
  TODOES_COMPLETE_TASK_ON_FAILURE_ACTION,
} from "./types";
import {TodoDataTypes} from "../types";


export const todoesStartLoading =
  makeActionCreator<ITodoesStartLoadingAction>(
    TODOES_START_LOADING_ACTION
  );
export const todoesStopLoading =
  makeActionCreator<ITodoesStopLoadingAction>(
    TODOES_STOP_LOADING_ACTION
  );

// List
export const getTodoesList =
  makeApiListAction<ITodoesGetListAction>(
    TODOES_GET_LIST_ACTION
  );
export const getTodoesListOnSuccess =
  makeApiOnSuccessAction<IGetTodoesListOnSuccessAction>(
    TODOES_GET_LIST_ON_SUCCESS_ACTION
  );
export const getTodoesListOnFailure =
  makeApiOnFailureAction<IGetTodoesListOnFailureAction>(
    TODOES_GET_LIST_ON_FAILURE_ACTION
  );

// Update
export const updateTodo =
  makeUpdateAction<IUpdateTodoAction, TodoDataTypes>(
    TODOES_UPDATE_ACTION
  );
export const updateTodoOnSuccess =
  makeApiOnSuccessAction<IUpdateTodoOnSuccessAction>(
    TODOES_UPDATE_ON_SUCCESS_ACTION
  );
export const updateTodoOnFailure =
  makeApiOnFailureAction<IUpdateTodoOnFailureAction>(
    TODOES_UPDATE_ON_FAILURE_ACTION
  );

// Create
export const createTodo =
  makeApiCreateAction<ICreateTodoAction, TodoDataTypes>(
    TODOES_CREATE_ACTION
  );
export const createTodoOnSuccess =
  makeApiOnSuccessAction<ICreateTodoOnSuccessAction>(
    TODOES_CREATE_ON_SUCCESS_ACTION
  );
export const createTodoOnFailure =
  makeApiOnFailureAction<ICreateTodoOnFailureAction>(
    TODOES_CREATE_ON_FAILURE_ACTION
  );

// Delete
export const deleteTodo =
  makeDeleteAction<IDeleteTodoAction>(
    TODOES_DELETE_ACTION
  );
export const deleteTodoOnSuccess =
  makeApiOnSuccessAction<IDeleteTodoOnSuccessAction>(
    TODOES_DELETE_ON_SUCCESS_ACTION
  );
export const deleteTodoOnFailure =
  makeApiOnFailureAction<IDeleteTodoOnFailureAction>(
    TODOES_DELETE_ON_FAILURE_ACTION
  );

// Complete
export const completeTodo =
  makeActionCreator<ICompleteTodoAction>(
    TODOES_COMPLETE_TASK_ACTION,
    'id', 'extraAction'
  );
export const completeTodoOnSuccess =
  makeApiOnSuccessAction<ICompleteTodoOnSuccessAction>(
    TODOES_COMPLETE_TASK_ON_SUCCESS_ACTION
  );
export const completeTodoOnFailure =
  makeApiOnFailureAction<ICompleteTodoOnFailureAction>(
    TODOES_COMPLETE_TASK_ON_FAILURE_ACTION
  );