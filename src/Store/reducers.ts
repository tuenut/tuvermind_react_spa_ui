import {combineReducers} from "redux";

import {todoesReducer} from "./__DEPRECATED__Todoes";


export const rootReducer = combineReducers({
  todoes: todoesReducer
});

