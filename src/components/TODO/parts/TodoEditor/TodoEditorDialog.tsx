import React from "react";

import { useDispatch } from "react-redux";

import Dialog from "@material-ui/core/Dialog";

// TODO: rewrite to context
import {
  todoesCreateRequestAction,
  todoesUpdateRequestAction
} from "../../../../Store/__DEPRECATED__Todoes";

import { EditorContextProvider, newTodo } from "./TodoEditorContext";
import { TODO_CLOSE_EDITOR, useTodoesListContext } from "../Context";
import { TodoEditor } from "./TodoEditor";
import { useTodoList } from "../../../../libs/swrHooks";


export const TodoEditorDialog = () => {
  const reduxDispatch = useDispatch();
  const {data: todoes} = useTodoList();

  const [state, localDispatch] = useTodoesListContext();
  const editingTodo = React.useMemo(
    () => state.editorTodo
      ? todoes[state.editorTodo]
      : newTodo(),
    [state.editorTodo]
  );
  const isOpen = React.useMemo(
    () => state.editorTodo !== undefined,
    [state.editorTodo]
  );

  const onClose = React.useCallback(
    () => localDispatch({type: TODO_CLOSE_EDITOR}),
    [localDispatch]
  );
  // TODO: rewrite on context
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
      open={isOpen}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <React.Fragment>
        {isOpen && (
          <EditorContextProvider todo={editingTodo}>
            <TodoEditor onClose={onClose} onSave={onSave}/>
          </EditorContextProvider>
        )}
      </React.Fragment>
    </Dialog>
  );
};