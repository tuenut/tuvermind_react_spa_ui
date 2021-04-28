export class ActionConfig {
  constructor(name, type, argNames) {
    Object.defineProperty(this, 'name', {value: name});
    Object.defineProperty(this, 'type', {value: type});
    Object.defineProperty(this, 'argNames', {value: argNames});
  }
}

export class ApiActionConfig extends ActionConfig {
  constructor(name, type, argNames) {
    const [_name, subtype] = name.split(".");

    super(_name, type, argNames);

    Object.defineProperty(this, 'api', {value: true});
    Object.defineProperty(this, 'subtype', {value: subtype});
  }
}


export class ActionCreator {
  static makeAction = (type, ...argsNames) => (...args) => {
    const argsMapper = (arg, idx) => ({
      [argsNames[idx]]: args[idx]
    });

    return Object.assign({type}, ...argsNames.map(argsMapper));
  };

  static RETRIEVE = 'retrieve';
  static LIST = 'list';
  static CREATE = 'create';
  static UPDATE = 'update';
  static DELETE = 'delete';
  static ON_SUCCESS = 'onSuccess';
  static ON_FAILURE = 'onFailure';

  static makeRetrieveAction = (type) => ActionCreator.makeAction(type, 'id', 'extraAction');
  static makeListAction = (type) => ActionCreator.makeAction(type, 'options');
  static makeCreateAction = (type) => ActionCreator.makeAction(type, 'data');
  static makeUpdateAction = (type) => ActionCreator.makeAction(type, 'id', 'data');
  static makeDeleteAction = (type) => ActionCreator.makeAction(type, 'id');
  static makeOnSuccessAction = (type) => ActionCreator.makeAction(type, 'response');
  static makeOnFailureAction = (type) => ActionCreator.makeAction(type, 'error');

  static apiActionsMap = {
    [ActionCreator.RETRIEVE]: ActionCreator.makeRetrieveAction,
    [ActionCreator.LIST]: ActionCreator.makeListAction,
    [ActionCreator.CREATE]: ActionCreator.makeCreateAction,
    [ActionCreator.UPDATE]: ActionCreator.makeUpdateAction,
    [ActionCreator.DELETE]: ActionCreator.makeDeleteAction,
    [ActionCreator.ON_SUCCESS]: ActionCreator.makeOnSuccessAction,
    [ActionCreator.ON_FAILURE]: ActionCreator.makeOnFailureAction,
  };

  /**
   * @param {Array.<ActionConfig, ApiActionConfig>} actions
   */
  constructor(actions) {
    for (const action of Object.entries(actions)) {
      if (action.api) {
        Object.defineProperty(this, name, {
          value: ActionCreator.apiActionsMap[action.subtype](action.type, ...action.argNames)
        })
      } else {
        Object.defineProperty(this, name, {
          value: ActionCreator.makeAction(name)(type, ...argNames)
        })
      }
    }
  }
}
