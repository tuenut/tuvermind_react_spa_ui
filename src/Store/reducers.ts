import {combineReducers} from "redux";

import {todoesReducer} from "./Todoes";


export const rootReducer = combineReducers({
  todoes: todoesReducer
});