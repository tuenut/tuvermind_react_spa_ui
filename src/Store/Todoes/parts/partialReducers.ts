import {Reducer} from "redux";
import {
  ITodoesListState} from "../types";
import {convertResponseDataToStoreObject} from "../../../utils/common";
import {
  IGetTodoesListOnSuccessAction, ITodoesErrorActions,
  ITodoesStartLoadingAction,
  ITodoesStopLoadingAction,
  IUpdateTodoOnSuccessAction
} from "../actions/types";

export const todoesSuccessGetListReducer:
  Reducer<ITodoesListState, IGetTodoesListOnSuccessAction> =
  (state, action) => ({
    ...state,
    error: false,
    data: convertResponseDataToStoreObject(action.response.data),
    _response: action.response,
    _error: null
  }as ITodoesListState);

export const todoesStartLoadingReducer:
  Reducer<ITodoesListState, ITodoesStartLoadingAction> =
  (state, action) => ({
    ...state,
    loading: true,
    error: false
  } as ITodoesListState);

export const todoesStopLoadingReducer:
  Reducer<ITodoesListState, ITodoesStopLoadingAction> =
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
  Reducer<ITodoesListState, IUpdateTodoOnSuccessAction> =
  (state, action) => ({
    ...state,
    data: {
      ...state!.data,
      [action.response.data.id]: action.response.data
    },
  } as ITodoesListState);