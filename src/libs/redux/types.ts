import {AnyAction, Reducer} from "redux";
import {AxiosError, AxiosResponse} from "axios";


type ValueType<T, K> = K extends keyof T ? T[K] : never;
type ActionType<Action> = ValueType<Action, "type"> | string;
type ActionArgs<Action> = ValueType<Action, Exclude<keyof Action, "type">>;

/**
 * Функция принимает `...restArgs`, которые соответсвуют типам полей Action,
 *  кроме `type`. Собирает и возвращает объект Action.
 */
export interface IActionCreator<Action> {
  (...args: ActionArgs<Action>[]): Action
}

export interface IActionCreator<Action> {
  (...args: ActionArgs<Action>[]): Action

  type?: ActionType<Action>
}

/**
 * Фабрика, которая принимает в качестве аргументов строку `ActionType`
 *  и `...restArgs`, которые должны соответсвовать другим полям Action,
 *  кроме поля `type` и возвращать функцию, которая будет собирать объект Action.
 */
export interface IGetActionCreator {
  <Action extends IBaseAction>(
    type: ActionType<Action>, ...argsNames: Exclude<keyof Action, "type">[]
  ): IActionCreator<Action>
}

// ACTIONS TYPES
export interface IBaseAction {
  type: string,
}

export interface IBaseAction {
  type: string,

  [key: string]: any
}

export interface IBaseRequestListAction extends IBaseAction {
  options?: any,
  extraAction?: string
}

export interface IBaseRequestListOnSuccessAction extends IBaseAction {
  response: AxiosResponse | object
}

export interface IBaseRequestListOnFailureAction extends IBaseAction {
  error: AxiosError | object
}

export type BaseApiActions =
  | IBaseAction
  | IBaseRequestListOnSuccessAction
  | IBaseRequestListOnFailureAction
  ;

export interface IBaseReducer {
  <S extends IBaseApiListState = IBaseApiListState, A extends IBaseAction = AnyAction>
  (state: S, action: A): S
}

// STATE
export interface IBaseApiListState {
  data: {
    [key: string]: any,
    [id: number]: any
  },
  loading: boolean,
  error: boolean,
  timestamp: Date | null,
  _response: AxiosResponse | null | undefined,
  _error: AxiosError | null,
}


// FACTORY
export interface ICreateActionObject {
  <Action extends IBaseAction>(
    action: string,
    ...argsNames: Exclude<keyof Action, "type">[]
  ): IActionCreator<Action>
}

export interface ICreateActionFactory {
  (string): ICreateActionObject
}

export interface ILoadingActions {
  START_LOADING: IActionCreator<IBaseAction>,
  STOP_LOADING: IActionCreator<IBaseAction>
}

export interface IRequestListActions {
  GET_LIST: IActionCreator<IBaseRequestListAction>,
  GET_LIST_ON_SUCCEESS: IActionCreator<IBaseRequestListOnSuccessAction>,
  GET_LIST_ON_FAILURE: IActionCreator<IBaseRequestListOnFailureAction>
}

export interface IClearDataActions {
  CLEAR_DATA: IActionCreator<IBaseAction>
}

export interface IReduxApiActions
  extends ILoadingActions, IRequestListActions, IClearDataActions {
}

export interface IReduxApiStateManagementFactory {
  (
    string,
    stateExtension?: object,
    reducerExtension?: Reducer
  ): [Reducer<IBaseApiListState, BaseApiActions>, IReduxApiActions]
}

export interface IBaseApiRetrieveRequestAction extends IBaseAction {
  id: number | string,
  extraAction?: string
}

export interface IBaseApiListRequestAction extends IBaseAction {
  options?: { [key: string]: any }
}

export interface IBaseApiCreateRequestAction<DataType = any> extends IBaseAction {
  data: DataType
}

export interface IBaseApiUpdateRequestAction<DataType = any> extends IBaseAction {
  id: number,
  data: DataType
}

export interface IBaseApiDeleteRequestAction extends IBaseAction {
  id: number,
}

export interface IBaseApiOnSuccessAction extends IBaseAction {
  response: AxiosResponse,
}

export interface IBaseApiOnFailureAction extends IBaseAction {
  error: object,
}


