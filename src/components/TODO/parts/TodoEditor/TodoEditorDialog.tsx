import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import { useEditorContext } from "./TodoEditorContext";
import { TodoEditor } from "./TodoEditor";


export const TodoEditorDialog = () => {
  const {todo, isEditorOpen, setIsEditorOpen} = useEditorContext();

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

      onClose();
    },
    [todo]
  );

  return (
    <Dialog fullWidth open={isEditorOpen} onClose={onClose} maxWidth={"sm"}>

      <DialogTitle>
        <Typography>
          {todo.id ? "Редактирование задачи" : "Новая задача"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {isEditorOpen && (
          <TodoEditor/>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color={"secondary"}>
          Отмена
        </Button>
        <Button onClick={onSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>

    </Dialog>
  );
};