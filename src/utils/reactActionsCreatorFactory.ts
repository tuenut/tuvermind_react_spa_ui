import {IBaseAction} from "../Store/types";

type ValueType<T, K> = K extends keyof T ? T[K] : never;
type ActionType<Action> = ValueType<Action, "type">;
type ActionArg<Action> = ValueType<Action, Exclude<keyof Action, "type">>;

/**
 * Функция принимает `...restArgs`, которые соответсвуют типам полей Action,
 *  кроме `type`. Собирает и возвращает объект Action.
 */
export interface IActionCreator<Action extends IBaseAction> {
  (...args: ActionArg<Action>[]): Action
}

/**
 * Фабрика, которая принимает в качестве аргументов строку `ActionType`
 *  и `...restArgs`, которые должны соответсвовать другим полям Action,
 *  кроме поля `type` и возвращать функцию, которая будет собирать объект Action.
 */
export interface IGetActionCreator {
  <Action>(
    type: ActionType<Action>,
    ...argsNames: Exclude<keyof Action, "type">[]
  ): IActionCreator<Action extends IBaseAction ? Action : IBaseAction>
}


export const getActionCreator: IGetActionCreator = (type, ...argsNames) =>
  (...args) => {
    const argsMapper = (arg, idx) => ({[argsNames[idx]]: args[idx]});

    return Object.assign({type}, ...argsNames.map(argsMapper));
  };
