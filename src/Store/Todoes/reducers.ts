import {combineReducers} from "redux";
import {IState} from "../types";
import {listReducer} from "./parts/listReducer";


export const todoesListSelector = (state: IState) => state.todoes.list;

export const todoesReducer = combineReducers({
  list: listReducer,
});

