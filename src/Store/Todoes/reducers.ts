import {combineReducers, Reducer} from "redux";

import {IState} from "../types";
import {ITodoesListState} from "./types";
import {
  todoesFailOnRequestReducer,
  todoesStartLoadingReducer,
  todoesStopLoadingReducer,
  todoesSuccessCompleteTaskReducer,
  todoesSuccessDeleteTaskReducer,
  todoesSuccessGetListReducer,
  todoesSuccessUpdateTaskReducer
} from "./parts/partialReducers";
import {
  TODOES_GET_LIST_ON_FAILURE_ACTION,
  TODOES_GET_LIST_ON_SUCCESS_ACTION,
  TODOES_START_LOADING_ACTION,
  TODOES_STOP_LOADING_ACTION,
  TODOES_UPDATE_ON_SUCCESS_ACTION,
  TODOES_COMPLETE_TASK_ON_SUCCESS_ACTION,
  TODOES_DELETE_ON_FAILURE_ACTION,
  TODOES_DELETE_ON_SUCCESS_ACTION,
  TODOES_UPDATE_ON_FAILURE_ACTION,
  TodoesActions,
} from "./actions/types";


export const todoesListSelector = (state: IState) => state.todoes.list;


const defaultListState: ITodoesListState = {
  loading: false,
  error: false,
  data: null,
  _response: null,
  _error: null,
};


export const listReducer: Reducer<ITodoesListState, TodoesActions> =
  (state = defaultListState, action) => {
    switch (action.type) {
      case TODOES_START_LOADING_ACTION:
        return todoesStartLoadingReducer(state, action);

      case TODOES_STOP_LOADING_ACTION:
        return todoesStopLoadingReducer(state, action);

      case TODOES_GET_LIST_ON_SUCCESS_ACTION:
        return todoesSuccessGetListReducer(state, action);

      case TODOES_UPDATE_ON_SUCCESS_ACTION:
        return todoesSuccessUpdateTaskReducer(state, action);

      case TODOES_COMPLETE_TASK_ON_SUCCESS_ACTION:
        return todoesSuccessCompleteTaskReducer(state, action);

      case TODOES_DELETE_ON_SUCCESS_ACTION:
        return todoesSuccessDeleteTaskReducer(state, action);

      case TODOES_GET_LIST_ON_FAILURE_ACTION:
      case TODOES_UPDATE_ON_FAILURE_ACTION:
      case TODOES_DELETE_ON_FAILURE_ACTION:
        return todoesFailOnRequestReducer(state, action);

      default:
        return state;
    }
  };

export const todoesReducer = combineReducers({
  list: listReducer,

});

