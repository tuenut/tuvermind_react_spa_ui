import React from 'react';

import {TodoListType} from "./dataTypes";
import {TodoActionsType} from "./actionsTypes";


export type TodoContextType = [TodoListType, React.Dispatch<TodoActionsType>];
export interface IUseTodo {
  () : TodoContextType
}