import {
  IBaseApiOnFailureAction
} from "./types";
import {
  IBaseApiCreateRequestAction, IBaseApiDeleteRequestAction,
  IBaseApiListRequestAction, IBaseApiOnSuccessAction,
  IBaseApiRetrieveRequestAction, IBaseApiUpdateRequestAction,
  IGetActionCreator
} from "./types";

export const makeActionCreator: IGetActionCreator = (type, ...argsNames) =>
  (...args) => Object.assign({type}, ...argsNames.map((arg, idx) =>
    ({[argsNames[idx]]: args[idx]})
  ));

export const makeApiOnSuccessAction = (type) =>
  makeActionCreator<IBaseApiOnSuccessAction>(type, 'response');

export const makeApiOnFailureAction = (type) =>
  makeActionCreator<IBaseApiOnFailureAction>(type, 'error');

export const makeApiRetrieveAction = (type) =>
  makeActionCreator<IBaseApiRetrieveRequestAction>(type, 'id', 'extraAction');

export const makeApiListAction = <T extends string>(type) =>
  makeActionCreator<IBaseApiListRequestAction>(type, 'options');

export const makeApiCreateAction = <D = any>(type) =>
  makeActionCreator<IBaseApiCreateRequestAction<D>>(type, 'data');

export const makeUpdateAction = <D = any>(type) =>
  makeActionCreator<IBaseApiUpdateRequestAction<D>>(type, 'id', 'data');

export const makeDeleteAction = (type) =>
  makeActionCreator<IBaseApiDeleteRequestAction>(type, 'id');

