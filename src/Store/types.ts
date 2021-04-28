import {AxiosError, AxiosResponse} from "axios";
import {ITodoesState} from "./Todoes/types";


export interface IBaseAction<ActionType = string> {
  type: ActionType
}

export interface IBaseApiUpdateAction<ActionType, DataType> extends IBaseAction<ActionType> {
  id: number,
  data: DataType
}

export interface IBaseApiOnSuccessAction<ActionType> extends IBaseAction<ActionType> {
  response: AxiosResponse,
}

export interface IBaseApiOnFailureAction<ActionType> extends IBaseAction<ActionType> {
  error: object,
}

export interface IBaseStateWithApi {
  loading: boolean,
  error: boolean,
  _response: null | AxiosResponse,
  _error: null | AxiosError | object,
}

export interface IState {
  todoes: ITodoesState
}