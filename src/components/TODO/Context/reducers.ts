import {TodoListType} from "./dataTypes";
import {TodoActionsType} from "./actionsTypes";
import {UPDATE_LIST_ACTION} from "./actions";

export type TodoReducer = React.Reducer<TodoListType, TodoActionsType>;
export interface ITodoPartialReducer<ActionType> {
  (state: TodoListType, action: ActionType): TodoListType
}


const updateTodoList = (state, action) => (action.payload);


export const TodoReducer  = (prevState, action) => {

  switch (action.type) {
    case UPDATE_LIST_ACTION:
      return updateTodoList(prevState, action);

    default:
      return prevState;
  }
};
