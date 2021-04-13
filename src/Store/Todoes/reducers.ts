import {combineReducers, Reducer} from "redux";

import {GetTodoesListActions, ITodoesListState} from "./types";
import {
  TODOES_GET_LIST_ON_FAILURE_ACTION,
  TODOES_GET_LIST_ON_SUCCESS_ACTION,
  TODOES_GET_LIST_START_LOADING_ACTION,
  TODOES_GET_LIST_STOP_LOADING_ACTION
} from "./actions";
import {IState} from "../types";


const defaultListState: ITodoesListState = {
  loading: false,
  error: false,
  data: null,
  _response: null,
  _error: null,
};

const listReducer: Reducer<ITodoesListState, GetTodoesListActions> =
  (state = defaultListState, action) => {
    switch (action.type) {
      case TODOES_GET_LIST_START_LOADING_ACTION:
        return {
          ...state,
          loading: true,
          error: false
        };
      case TODOES_GET_LIST_STOP_LOADING_ACTION:
        return {
          ...state,
          loading: false
        };
      case TODOES_GET_LIST_ON_SUCCESS_ACTION:
        return {
          ...state,
          error: false,
          data: action.response.data,
          _response: action.response,
          _error: null
        };
      case TODOES_GET_LIST_ON_FAILURE_ACTION:
        return {
          ...state,
          error: true,
          _error: action.error,
        };
      default:
        return state;
    }
  };

export const todoesListSelector = (state: IState) => state.todoes.list;


export const todoesReducer = combineReducers({
  list: listReducer,
});

