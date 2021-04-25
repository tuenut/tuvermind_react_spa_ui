import {Reducer} from "redux";
import {IGetTodoesListOnSuccess, ITodoesListState} from "../types";
import {convertResponseDataToStoreObject} from "../../../utils/common";

export const listOnSuccessReducer: Reducer<ITodoesListState, IGetTodoesListOnSuccess> =
  (state, action) => ({
    ...state,
    error: false,
    data: convertResponseDataToStoreObject(action.response.data),
    _response: action.response,
    _error: null
  }) as ITodoesListState;