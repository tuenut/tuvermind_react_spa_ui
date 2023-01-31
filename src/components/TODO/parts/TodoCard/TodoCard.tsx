import React from "react";

import Card from "@material-ui/core/Card/Card";

import { openEditorToEditTodoAction, useEditorContext } from "../TodoEditor/TodoEditorContext";
import { ITodoObject } from "../../../../libs/swrHooks/todoes/types";

import { TodoCardTitle } from "./TodoCardTitle";
import { TodoCardActions } from "./TodoCardActions";
import { TodoCardContent } from "./TodoCardContent";
import { useTodoCardContext } from "./TodoCardContext";


export const TodoCard: React.FC<{ todo: ITodoObject }> = ({todo}) => {

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