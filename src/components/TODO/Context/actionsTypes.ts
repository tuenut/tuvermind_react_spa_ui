import {UPDATE_LIST_ACTION} from "./actions";
import {TodoListType} from "./dataTypes";


export interface IBaseAction<TypeOfAction> {
  type: TypeOfAction
}

export interface IUpdateListAction extends IBaseAction <typeof UPDATE_LIST_ACTION> {
  payload: TodoListType
}

export type TodoActionsType = |
  IUpdateListAction
  ;