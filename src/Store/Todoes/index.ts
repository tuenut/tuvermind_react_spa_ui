import {apiListManagementFactory} from "../../libs/redux";
import {
  makeApiCreateAction,
  makeApiOnFailureAction,
  makeApiOnSuccessAction,
} from "../../libs/redux/actions";
import {reduceOnFailedGetListAction} from "../../libs/redux/apiListState";

import {IState} from "../types";


export const [todoesListReducer, actions] = apiListManagementFactory("todoes");

export const TODOES_CREATE_REQUEST_ACTION = "TODOES_CREATE_REQUEST_ACTION";
export const TODOES_CREATE_ON_SUCCESS_ACTION = "TODOES_CREATE_ON_SUCCESS_ACTION";
export const TODOES_CREATE_ON_FAILURE_ACTION = "TODOES_CREATE_ON_FAILURE_ACTION";
export const todoesCreateAction = makeApiCreateAction(TODOES_CREATE_REQUEST_ACTION);
export const todoesCreateOnSuccessAction = makeApiOnSuccessAction(TODOES_CREATE_ON_SUCCESS_ACTION);
export const todoesCreateOnFailureAction = makeApiOnFailureAction(TODOES_CREATE_ON_FAILURE_ACTION);


export const todoesListSelector = (state: IState) => state.todoes;

export const todoesReducer = (state, action) => {
  state = todoesListReducer(state, action);

  switch (action.type) {
    case TODOES_CREATE_ON_SUCCESS_ACTION:
      console.debug({action});

      return ({
        ...state,
        data: {
          ...state.data,
          [action.response.data.id]: action.response.data
        }
      });

    case TODOES_CREATE_ON_FAILURE_ACTION:
      return reduceOnFailedGetListAction(state, action);

    default:
      return state;
  }
};
