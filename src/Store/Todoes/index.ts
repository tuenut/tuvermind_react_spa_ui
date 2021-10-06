import { DateTime } from "luxon/src/luxon";

import { apiListManagementFactory } from "../../libs/redux";

import {
  makeApiCreateAction,
  makeApiOnFailureAction,
  makeApiOnSuccessAction, makeApiRetrieveAction,
  makeUpdateAction,
} from "../../libs/redux/actions";

import { reduceOnFailedGetListAction } from "../../libs/redux/apiListState";

import { IState } from "../types";


export const [todoesListReducer, actions] = apiListManagementFactory("todoes");

export const TODOES_CREATE_REQUEST_ACTION = "TODOES_CREATE_REQUEST_ACTION";
export const TODOES_CREATE_ON_SUCCESS_ACTION = "TODOES_CREATE_ON_SUCCESS_ACTION";
export const TODOES_CREATE_ON_FAILURE_ACTION = "TODOES_CREATE_ON_FAILURE_ACTION";
export const todoesCreateRequestAction =
  makeApiCreateAction(TODOES_CREATE_REQUEST_ACTION);
export const todoesCreateOnSuccessAction =
  makeApiOnSuccessAction(TODOES_CREATE_ON_SUCCESS_ACTION);
export const todoesCreateOnFailureAction =
  makeApiOnFailureAction(TODOES_CREATE_ON_FAILURE_ACTION);

export const TODOES_UPDATE_REQUEST_ACTION = "TODOES_UPDATE_REQUEST_ACTION";
export const TODOES_UPDATE_ON_SUCCESS_ACTION = "TODOES_UPDATE_ON_SUCCESS_ACTION";
export const TODOES_UPDATE_ON_FAILURE_ACTION = "TODOES_UPDATE_ON_FAILURE_ACTION";
export const todoesUpdateRequestAction =
  makeUpdateAction(TODOES_UPDATE_REQUEST_ACTION);
export const todoesUpdateOnSuccessAction =
  makeApiOnSuccessAction(TODOES_UPDATE_ON_SUCCESS_ACTION);
export const todoesUpdateOnFailureAction =
  makeApiOnFailureAction(TODOES_UPDATE_ON_FAILURE_ACTION);

export const TODOES_COMPLETE_REQUEST_ACTION = "TODOES_COMPLETE_REQUEST_ACTION";
export const TODOES_COMPLETE_REQUEST_ON_SUCCESS_ACTION = "TODOES_COMPLETE_REQUEST_ON_SUCCESS_ACTION";
export const TODOES_COMPLETE_REQUEST_ON_FAILURE_ACTION = "TODOES_COMPLETE_REQUEST_ON_FAILURE_ACTION";
export const todoesCompleteRequestAction =
  makeApiRetrieveAction(TODOES_COMPLETE_REQUEST_ACTION);
export const todoesCompleteRequestOnSuccessAction =
  makeApiOnSuccessAction(TODOES_COMPLETE_REQUEST_ON_SUCCESS_ACTION);
export const todoesCompleteRequestOnFailureAction =
  makeApiOnFailureAction(TODOES_COMPLETE_REQUEST_ON_FAILURE_ACTION);

export const todoesListSelector = (state: IState) => state.todoes;


/*TODO привести к виду ниже

Стейт пусть будет вида `{[id: number | strung]: ITodo}`, тогда все обновления
должны туда корректно попадать.
 - То есть, list обрабатывает МАССИВ и обновляет
стейт для существующих записей, добавляет новые. При пагинации, так же принцип
append/update. При полном обновлении сначала очистить стейт целиком.
 - Create, update, complete - прилетает новый объект ОДНОЙ записи.
 - Delete - сообщает id записи, которую надо убрать из стейта.
 */
export const todoesReducer = (state, action) => {
  state = todoesListReducer(state, action);

  switch ( action.type ) {
    case TODOES_UPDATE_ON_SUCCESS_ACTION:
    case TODOES_CREATE_ON_SUCCESS_ACTION: // TODO здесь есть проблема, предположительно
      return ({
        ...state,
        data: {
          ...state.data,
          [action.response.data.id]: action.response.data
        }
      });

    case TODOES_UPDATE_ON_FAILURE_ACTION:
    case TODOES_CREATE_ON_FAILURE_ACTION:
      return reduceOnFailedGetListAction(state, action);

    default:
      return state;
  }
};
