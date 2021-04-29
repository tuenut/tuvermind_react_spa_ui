import {
  IBaseAction, IBaseApiCreateRequestAction, IBaseApiDeleteRequestAction,
  IBaseApiListRequestAction,
  IBaseApiOnFailureAction,
  IBaseApiOnSuccessAction,
  IBaseApiRetrieveRequestAction, IBaseApiUpdateRequestAction
} from "../Store/types";

type ValueType<T, K> = K extends keyof T ? T[K] : never;
type ActionType<Action> = ValueType<Action, "type">;
type ActionArg<Action> = ValueType<Action, Exclude<keyof Action, "type">>;

/**
 * Функция принимает `...restArgs`, которые соответсвуют типам полей Action,
 *  кроме `type`. Собирает и возвращает объект Action.
 */
export interface IActionCreator<Action> {
  (...args: ActionArg<Action>[]): Action
}

/**
 * Фабрика, которая принимает в качестве аргументов строку `ActionType`
 *  и `...restArgs`, которые должны соответсвовать другим полям Action,
 *  кроме поля `type` и возвращать функцию, которая будет собирать объект Action.
 */
export interface IGetActionCreator {
  <Action>(
    type: ActionType<Action>, ...argsNames: Exclude<keyof Action, "type">[]
  ): IActionCreator<Action>
}

export const makeActionCreator: IGetActionCreator = (type, ...argsNames) =>
  (...args) => Object.assign({type}, ...argsNames.map((arg, idx) =>
    ({[argsNames[idx]]: args[idx]})
  ));

export const makeApiOnSuccessAction = <T>(type) =>
  makeActionCreator<IBaseApiOnSuccessAction<T>>(type, 'response');

export const makeApiOnFailureAction = <T>(type) =>
  makeActionCreator<IBaseApiOnFailureAction<T>>(type, 'error');

export const makeApiRetrieveAction = <T>(type) =>
  makeActionCreator<IBaseApiRetrieveRequestAction<T>>(type, 'id', 'extraAction');

export const makeApiListAction = <T>(type) =>
  makeActionCreator<IBaseApiListRequestAction<T>>(type, 'options');

export const makeApiCreateAction = <T, D>(type) =>
  makeActionCreator<IBaseApiCreateRequestAction<T, D>>(type, 'data');

export const makeUpdateAction = <T, D>(type) =>
  makeActionCreator<IBaseApiUpdateRequestAction<T, D>>(type, 'id', 'data');

export const makeDeleteAction = <T>(type) =>
  makeActionCreator<IBaseApiDeleteRequestAction<T>>(type, 'id');

