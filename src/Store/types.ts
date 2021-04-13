import {AxiosError, AxiosResponse} from "axios";
import {ITodoesState} from "./Todoes/types";


export interface IBaseAction {
  type: string
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