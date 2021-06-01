import { DateTime } from "luxon/src/luxon";

import { apiListManagementFactory } from "../../libs/redux";

import {
  makeApiCreateAction,
  makeApiOnFailureAction,
  makeApiOnSuccessAction,
  makeUpdateAction,
} from "../../libs/redux/actions";

import { reduceOnFailedGetListAction } from "../../libs/redux/apiListState";

import { IState } from "../types";
import { ITodo, ITodoFromApi, ITodoReminder, ITodoReminderFromApi } from "./types";


export const [todoesListReducer, actions] = apiListManagementFactory("todoes");

export const TODOES_CREATE_REQUEST_ACTION = "TODOES_CREATE_REQUEST_ACTION";
export const TODOES_CREATE_ON_SUCCESS_ACTION = "TODOES_CREATE_ON_SUCCESS_ACTION";
export const TODOES_CREATE_ON_FAILURE_ACTION = "TODOES_CREATE_ON_FAILURE_ACTION";
export const todoesCreateRequestAction = makeApiCreateAction(TODOES_CREATE_REQUEST_ACTION);
export const todoesCreateOnSuccessAction = makeApiOnSuccessAction(TODOES_CREATE_ON_SUCCESS_ACTION);
export const todoesCreateOnFailureAction = makeApiOnFailureAction(TODOES_CREATE_ON_FAILURE_ACTION);

export const TODOES_UPDATE_REQUEST_ACTION = "TODOES_UPDATE_REQUEST_ACTION";
export const TODOES_UPDATE_ON_SUCCESS_ACTION = "TODOES_UPDATE_ON_SUCCESS_ACTION";
export const TODOES_UPDATE_ON_FAILURE_ACTION = "TODOES_UPDATE_ON_FAILURE_ACTION";
export const todoesUpdateRequestAction = makeUpdateAction(TODOES_UPDATE_REQUEST_ACTION);
export const todoesUpdateOnSuccessAction = makeApiOnSuccessAction(TODOES_UPDATE_ON_SUCCESS_ACTION);
export const todoesUpdateOnFailureAction = makeApiOnFailureAction(TODOES_UPDATE_ON_FAILURE_ACTION);


export const todoesListSelector = (state: IState) => state.todoes;

export const todoesReducer = (state, action) => {
  state = todoesListReducer(state, action);

  switch ( action.type ) {
    case TODOES_UPDATE_ON_SUCCESS_ACTION:
    case TODOES_CREATE_ON_SUCCESS_ACTION:
      return ({
        ...state,
        data: {
          ...state.data,
          [action.response.data.id]: action.response.data
        }
      });
      break;

    case TODOES_UPDATE_ON_FAILURE_ACTION:
    case TODOES_CREATE_ON_FAILURE_ACTION:
      return reduceOnFailedGetListAction(state, action);
      break;

    default:
      return state;
  }
};
