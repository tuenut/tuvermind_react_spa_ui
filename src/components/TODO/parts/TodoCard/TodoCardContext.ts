import React from "react";
import { openEditorToEditTodoAction, useEditorContext } from "../TodoEditor/TodoEditorContext";
import { ITodoObject } from "../../../../libs/swrHooks/todoes/types";


const TodoCardContext = React.createContext(null! as {
  todo: ITodoObject,
  isCompleted: boolean,
  expanded: boolean,
  onClick,
  openEditor,
  completeTodo,
  deleteTodo
});

export const useTodoCardContext = () => React.useContext(TodoCardContext);

export const TodoCardContextProvider = ({todo, ...props}) => {
  const {dispatch, setIsEditorOpen} = useEditorContext();

  const [expanded, setExpanded] = React.useState(false);
  const onClick = React.useCallback(
    () => setExpanded(!expanded),
    [expanded, setExpanded]
  );

  const isCompleted = React.useMemo(() =>
      !((todo.status === "suspense") || !(todo.status === "inProcess"))
    , [todo]
  );
  const openEditor = React.useCallback(
    () => {
      if ( !isCompleted ) {
        dispatch(openEditorToEditTodoAction(todo));
        setIsEditorOpen(true);
      }
    },
    [todo, isCompleted]
  );

  const completeTodo = React.useCallback(
    () => alert("Not Implemented Error!"),
    [todo]
  );
  const deleteTodo = React.useCallback(
    () => alert("Not Implemented Error!"),
    [todo]
  );

  const value = React.useMemo(
    () => ({
      expanded, onClick, openEditor, isCompleted, completeTodo, deleteTodo
    }),
    [])

};