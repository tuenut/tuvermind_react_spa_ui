import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Dialog from "@material-ui/core/Dialog";

// TODO: rewrite to context
import {
  todoesCreateRequestAction,
  todoesListSelector,
  todoesUpdateRequestAction
} from "../../../../Store/Todoes";

import { EditorContextProvider, newTodo } from "./TodoEditorContext";
import { TODO_CLOSE_EDITOR, useTodoesListContext } from "../Context";
import { TodoEditor } from "./TodoEditor";


export const TodoEditorDialog = () => {
  const reduxDispatch = useDispatch();
  const todoes = useSelector(todoesListSelector);

  const [state, localDispatch] = useTodoesListContext();

  const onClose = React.useCallback(
    () => localDispatch({type: TODO_CLOSE_EDITOR}),
    [localDispatch]
  );
  const onSave = React.useCallback(
    (todo) => {
      console.log({todo});

      if ( todo.id ) {
        reduxDispatch(todoesUpdateRequestAction(todo.id, todo));
      } else {
        reduxDispatch(todoesCreateRequestAction(todo));
      }
    },
    [reduxDispatch]
  );

  return (
    <Dialog
      open={state.editorTodo !== undefined}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <React.Fragment>
        {((state.editorTodo !== undefined) && todoes.data) && (
          <EditorContextProvider
            todo={typeof state.editorTodo === "number"
              ? todoes.data[state.editorTodo]
              : newTodo()
            }
          >
            <TodoEditor onClose={onClose} onSave={onSave}/>
          </EditorContextProvider>
        )}
      </React.Fragment>
    </Dialog>
  );
};