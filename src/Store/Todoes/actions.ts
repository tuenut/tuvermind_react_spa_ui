// Get new todoes list. Rewrite entire old list.
import {getActionCreator} from "../../utils/reactActionsCreatorFactory";
import {
  IGetTodoesList,
  IGetTodoesListOnFailure,
  IGetTodoesListOnSuccess,
  ITodoesStartLoading,
  ITodoesStopLoading, IUpdateTodo, IUpdateTodoOnFailure, IUpdateTodoOnSuccess
} from "./types";

// Get new list from server.
export const TODOES_GET_LIST_ACTION = "TODOES_GET_LIST_ACTION";
export const TODOES_START_LOADING_ACTION = "TODOES_GET_LIST_START_LOADING_ACTION";
export const TODOES_STOP_LOADING_ACTION = "TODOES_GET_LIST_STOP_LOADING_ACTION";
export const TODOES_GET_LIST_ON_SUCCESS_ACTION = "TODOES_GET_LIST_ON_SUCCESS_ACTION";
export const TODOES_GET_LIST_ON_FAILURE_ACTION = "TODOES_GET_LIST_ON_FAILURE_ACTION";

// Append existed list.
export const TODOES_UPDATE_LIST_ACTION = "TODOES_UPDATE_LIST_ACTION";
export const TODOES_UPDATE_LIST_ON_SUCCESS_ACTION = "TODOES_UPDATE_LIST_ON_SUCCESS_ACTION";
export const TODOES_UPDATE_LIST_ON_FAILURE_ACTION = "TODOES_UPDATE_LIST_ON_FAILURE_ACTION";

// Get concrete entity by id.
export const TODOES_RETRIEVE_ACTION = "TODOES_RETRIEVE_ACTION";
export const TODOES_RETRIEVE_ON_SUCCESS_ACTION = "TODOES_RETRIEVE_ON_SUCCESS_ACTION";
export const TODOES_RETRIEVE_ON_FAILURE_ACTION = "TODOES_RETRIEVE_ON_FAILURE_ACTION";

// Create new entity.
export const TODOES_CREATE_ACTION = "TODOES_CREATE_ACTION";
export const TODOES_CREATE_ON_SUCCESS_ACTION = "TODOES_CREATE_ON_SUCCESS_ACTION";
export const TODOES_CREATE_ON_FAILURE_ACTION = "TODOES_CREATE_ON_FAILURE_ACTION";

// Update existed entity.
export const TODOES_UPDATE_ACTION = "TODOES_UPDATE_ACTION";
export const TODOES_UPDATE_ON_SUCCESS_ACTION = "TODOES_UPDATE_ON_SUCCESS_ACTION";
export const TODOES_UPDATE_ON_FAILURE_ACTION = "TODOES_UPDATE_ON_FAILURE_ACTION";

// Delete entity.
export const TODOES_DELETE_ACTION = "TODOES_DELETE_ACTION";
export const TODOES_DELETE_ON_SUCCESS_ACTION = "TODOES_DELETE_ON_SUCCESS_ACTION";
export const TODOES_DELETE_ON_FAILURE_ACTION = "TODOES_DELETE_ON_FAILURE_ACTION";

// Clear list.
export const TODOES_CLEAR_LIST_ACTION = "TODOES_CLEAR_LIST_ACTION";


export const getTodoesList =
  getActionCreator<IGetTodoesList>(
    TODOES_GET_LIST_ACTION,
    'options'
  );

export const getTodoesListStartLoading =
  getActionCreator<ITodoesStartLoading>(
    TODOES_START_LOADING_ACTION
  );

export const getTodoesListStopLoading =
  getActionCreator<ITodoesStopLoading>(
    TODOES_STOP_LOADING_ACTION
  );

export const getTodoesListOnSuccess =
  getActionCreator<IGetTodoesListOnSuccess>(
    TODOES_GET_LIST_ON_SUCCESS_ACTION,
    'response'
  );

export const getTodoesListOnFailure =
  getActionCreator<IGetTodoesListOnFailure>(
    TODOES_GET_LIST_ON_FAILURE_ACTION,
    'error'
  );

export const updateTodo =
  getActionCreator<IUpdateTodo>(
    TODOES_UPDATE_ACTION,
    'id', 'data'
  );
export const updateTodoOnSuccess =
  getActionCreator<IUpdateTodoOnSuccess>(
    TODOES_UPDATE_ON_SUCCESS_ACTION,
    'response'
  );
export const updateTodoOnFailure =
  getActionCreator<IUpdateTodoOnFailure>(
    TODOES_UPDATE_ON_FAILURE_ACTION,
    'error'
  );