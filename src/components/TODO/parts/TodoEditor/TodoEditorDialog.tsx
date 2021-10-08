import React from "react";

import Dialog from "@material-ui/core/Dialog";

import { useEditorContext } from "./TodoEditorContext";
import { TodoEditor } from "./TodoEditor";


export const TodoEditorDialog = () => {
  const {todo, dispatch, isEditorOpen, setIsEditorOpen} = useEditorContext();

  const onClose = React.useCallback(
    () => setIsEditorOpen(false),
    []
  );

  const onSave = React.useCallback(
    (todo) => {
      if ( todo.id ) {
        alert("Not Implemented Error!");
      } else {
        alert("Not Implemented Error!");
      }
    },
    [todo]
  );

  return (
    <Dialog
      fullWidth
      open={isEditorOpen}
      onClose={onClose}
      maxWidth={"sm"}
    >
      <React.Fragment>
        {isEditorOpen && (
          <TodoEditor onClose={onClose} onSave={onSave}/>
        )}
      </React.Fragment>
    </Dialog>
  );
};