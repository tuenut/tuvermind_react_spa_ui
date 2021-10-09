import React from "react";

import Card from "@material-ui/core/Card/Card";

import { useEditorContext } from "../TodoEditor/TodoEditorContext";
import { ITodoObject } from "../../../../libs/swrHooks/todoes/types";

import { TodoCardTitle } from "./TodoCardTitle";
import { TodoCardActions } from "./TodoCardActions";
import { TodoCardContent } from "./TodoCardContent";


export const TodoCard: React.FC<{ todo: ITodoObject }> = ({todo}) => {
  const [expanded, setExpand] = React.useState(false);

  const {dispatch, setIsEditorOpen} = useEditorContext();

  const expandCollaapseCard = React.useCallback(
    () => setExpand(!expanded),
    [expanded]
  );

  const isCompleted = React.useMemo(() =>
      !((todo.status === "suspense") || !(todo.status === "inProcess"))
    , [todo]
  );

  const openEditor = React.useCallback(
    () => {
      if ( !isCompleted ) {
        // dispatch(openEditorToEditTodoAction(todo));
        alert("Not Implemented Error!");
      }
    },
    [todo, isCompleted]
  );

  return (
    <Card>
      <TodoCardTitle
        todo={todo}
        expanded={expanded}
        completed={isCompleted}
        openEditor={openEditor}
        onTitleClick={expandCollaapseCard}
      />
      <TodoCardActions
        todo={todo}
        expanded={expanded}
        completed={isCompleted}
        openEditor={openEditor}
      />
      <TodoCardContent todo={todo} expanded={expanded}/>
    </Card>
  );
};