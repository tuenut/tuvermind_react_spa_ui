/**
 * @example
 * import {reduxApiStateManagementFactory} from "../store/common";
 *
 * export const [reducer, actions] = reduxApiStateManagementFactory("someStateName");
 * */

import {Reducer} from "redux";

import {
  IReduxApiStateManagementFactory,
  BaseApiActions,
  IBaseAction,
  IBaseApiListState,
  IBaseReducer,
  IBaseRequestListAction,
  IBaseRequestListOnFailureAction,
  IBaseRequestListOnSuccessAction,
  IClearDataActions,
  ICreateActionFactory,
  ILoadingActions,
  IRequestListActions,
} from "./types";


import {convertResponseDataToStoreObject} from "../common";
import {makeActionCreator} from "./actions";


export const createDefaultState = (): IBaseApiListState => ({
  data: {},
  loading: false,
  error: false,
  timestamp: null,
  _response: null,
  _error: null,
});

export const reduceStartLoadingAction: IBaseReducer =
  (state, action) => ({...state, loading: true});

export const reduceStopLoadingAction: IBaseReducer =
  (state, action) => ({...state, loading: false});

export const reduceOnSuccededGetListAction: IBaseReducer =
  (state, action) => ({
    ...state,
    data: {
      ...state.data,
      ...convertResponseDataToStoreObject(action.response.data.results)
    },
    error: false,
    timestamp: state.timestamp ? state.timestamp : new Date(),
    _response: action.response,
    _error: null,
  });

export const reduceOnFailedGetListAction: IBaseReducer =
  (state, action) => ({
    ...state,
    error: true,
    timestamp: null,
    _response: action.error.response,
    _error: action.error,
  });


export const createActionFactory: ICreateActionFactory = (prefix) =>
  (action, ...argsNames) => {
    const name = `${prefix}_${action}`.toUpperCase();

    const creator = makeActionCreator(name, ...argsNames);
    creator.type = name;

    return creator;
  };


export const createLoadingActions = (prefix: string): ILoadingActions => {
  const actionsFactory = createActionFactory(prefix);

  return ({
    START_LOADING: actionsFactory<IBaseAction>("START_LOADING"),
    STOP_LOADING: actionsFactory<IBaseAction>("STOP_LOADING")
  });
};


export const createRequestListActions = (prefix: string): IRequestListActions => {
  const actionsFactory = createActionFactory(prefix);

  return ({
    GET_LIST: actionsFactory<IBaseRequestListAction>(
      "GET_LIST", 'options', 'extraAction'
    ),
    GET_LIST_ON_SUCCEESS: actionsFactory<IBaseRequestListOnSuccessAction>(
      "GET_LIST_ON_SUCCEESS", 'response'
    ),
    GET_LIST_ON_FAILURE: actionsFactory<IBaseRequestListOnFailureAction>(
      "GET_LIST_ON_FAILURE", 'error'
    ),
  });
};

export const createClearDataAction = (prefix: string): IClearDataActions => ({
  CLEAR_DATA: createActionFactory(prefix)<IBaseAction>("CLEAR_DATA")
});


export const apiListManagementFactory: IReduxApiStateManagementFactory =
  <StateType extends IBaseApiListState = IBaseApiListState,
    ActionsType extends BaseApiActions = BaseApiActions>
  (prefix, stateExtension?, reducerExtension?) => {

    const createConcreteDefaultState = () =>
      ({...createDefaultState(), ...stateExtension});

    const defaultState = createConcreteDefaultState();

    const actions = {
      ...createLoadingActions(prefix),
      ...createRequestListActions(prefix),
      ...createClearDataAction(prefix)
    };

    let reducer: Reducer<StateType, ActionsType> =
      (state = defaultState, action) => {
        let newState = state;

        switch (action.type) {
          case actions.CLEAR_DATA.type:
            newState = {...state, data: {...defaultState.data}};
            break;

          case actions.START_LOADING.type:
            newState = reduceStartLoadingAction(state, action);
            break;

          case actions.STOP_LOADING.type:
            newState = reduceStopLoadingAction(state, action);
            break;

          case actions.GET_LIST_ON_SUCCEESS.type:
            newState = reduceOnSuccededGetListAction(state, action);
            break;

          case actions.GET_LIST_ON_FAILURE.type:
            newState = reduceOnFailedGetListAction(state, action);
            break;

          default:
            newState = state;
        }

        return newState;
      };

    if (reducerExtension instanceof Function) {
      return ([
        (state: any, action: any) => reducerExtension(reducer(state, action), action),
        actions
      ])
    }

    return [reducer, actions];
  };