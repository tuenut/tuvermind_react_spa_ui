type ValueType<T, K> = K extends keyof T ? T[K] : never;
type ActionType<Action> = ValueType<Action, "type">;
type ActionArg<Action> = ValueType<Action, Exclude<keyof Action, "type">>;

/**
 * Функция принимает `...restArgs`, которые соответсвуют типам полей Action,
 *  кроме `type`. Собирает и возвращает объект Action.
 */
interface IActionCreator<Action> {
  (...args: ActionArg<Action>[]): Action
}

/**
 * Фабрика, которая принимает в качестве аргументов строку `ActionType`
 *  и `...restArgs`, которые должны соответсвовать другим полям Action,
 *  кроме поля `type` и возвращать функцию, которая будет собирать объект Action.
 */
export interface IMakeActionCreator {
  <Action>(
    type: ActionType<Action>,
    ...argsNames: Exclude<keyof Action, "type">[]
  ): IActionCreator<Action>
}


export const makeActionCreator: IMakeActionCreator = (type, ...argsNames) =>
  (...args) => {
    const argsMapper = (arg, idx) => ({[argsNames[idx]]: args[idx]});

    return Object.assign({type}, ...argsNames.map(argsMapper));
  };
