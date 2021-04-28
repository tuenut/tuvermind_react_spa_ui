import {AxiosError, AxiosResponse} from "axios";
import {ITodoesState} from "./Todoes/types";


export interface IBaseAction<ActionType = string> {
  type: ActionType
}


// REST API Actions.
export interface IBaseApiRetrieveRequestAction<ActionType>
  extends IBaseAction<ActionType> {
  id: number | string,
  extraAction?: string
}

export interface IBaseApiListRequestAction<ActionType>
  extends IBaseAction<ActionType> {
  options?: { [key: string]: any }
}

export interface IBaseApiCreateRequestAction<ActionType, DataType>
  extends IBaseAction<ActionType> {
  data: DataType
}

export interface IBaseApiUpdateRequestAction<ActionType, DataType>
  extends IBaseAction<ActionType> {
  id: number,
  data: DataType
}

export interface IBaseApiDeleteRequestAction<ActionType>
  extends IBaseAction<ActionType> {
  id: number,
}


// Actions for handling request responses.
export interface IBaseApiOnSuccessAction<ActionType>
  extends IBaseAction<ActionType> {
  response: AxiosResponse,
}

export interface IBaseApiOnFailureAction<ActionType>
  extends IBaseAction<ActionType> {
  error: object,
}


// State
export interface IBaseStateWithApi {
  loading: boolean,
  error: boolean,
  _response: null | AxiosResponse,
  _error: null | AxiosError | object,
}

export interface IState {
  todoes: ITodoesState
}