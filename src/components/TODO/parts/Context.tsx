import React from "react";
import { actions, ILocalState, IUseTodoesListContext } from "./types";


export const TODO_OPEN_EDITOR = "TODO_OPEN_EDITOR";
export const TODO_CLOSE_EDITOR = "TODO_CLOSE_EDITOR";


const defaultState: ILocalState = {
  editorTodo: undefined
};

const TodoesListContext = React.createContext(null!);

export const useTodoesListContext: IUseTodoesListContext = () =>
  React.useContext(TodoesListContext);


const reducer = (state: ILocalState = defaultState, action: actions) => {
  switch (action.type) {

    case TODO_OPEN_EDITOR:
      return ({
        ...state,
        editorTodo: action.todo
      });

    case TODO_CLOSE_EDITOR:
      return ({
        ...state,
        editorTodo: undefined
      });

    default:
      return state;
  }
};


export const TodoesListContextProvider = (props) => {
  const [localState, dispatch] = React.useReducer(reducer, defaultState);

  const value = React.useMemo(
    () => [localState, dispatch],
    [localState]
  );

  return <TodoesListContext.Provider {...props} value={value}/>
};

