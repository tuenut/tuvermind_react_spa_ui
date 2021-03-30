import {makeActionCreator} from "../../../utils/reactActionsCreatorFactory";
import {IUpdateListAction} from "./actionsTypes";


export const UPDATE_LIST_ACTION = "UPDATE_LIST";

export const updateListAction = makeActionCreator<IUpdateListAction>(UPDATE_LIST_ACTION, 'payload');