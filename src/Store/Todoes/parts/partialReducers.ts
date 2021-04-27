import {Reducer} from "redux";
import {
  IGetTodoesListOnSuccess,
  ITodoesStartLoading,
  ITodoesListState,
  ITodoesStopLoading,
  ITodoesErrorActions, IUpdateTodoOnSuccess
} from "../types";
import {convertResponseDataToStoreObject} from "../../../utils/common";

export const todoesSuccessGetListReducer:
  Reducer<ITodoesListState, IGetTodoesListOnSuccess> =
  (state, action) => ({
    ...state,
    error: false,
    data: convertResponseDataToStoreObject(action.response.data),
    _response: action.response,
    _error: null
  }as ITodoesListState);

export const todoesStartLoadingReducer:
  Reducer<ITodoesListState, ITodoesStartLoading> =
  (state, action) => ({
    ...state,
    loading: true,
    error: false
  } as ITodoesListState);

export const todoesStopLoadingReducer:
  Reducer<ITodoesListState, ITodoesStopLoading> =
  (state, action) => ({
    ...state,
    loading: false
  } as ITodoesListState);

export const todoesFailOnRequestReducer:
  Reducer<ITodoesListState, ITodoesErrorActions> =
  (state, action) => ({
    ...state,
    error: true,
    _error: action.error,
  } as ITodoesListState);

export const todoesSuccessUpdateObjectReducer:
  Reducer<ITodoesListState, IUpdateTodoOnSuccess> =
  (state, action) => ({
    ...state,
    data: {
      ...state!.data,
      [action.response.data.id]: action.response.data
    },
  } as ITodoesListState);