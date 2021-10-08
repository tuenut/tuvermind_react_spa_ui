import React from "react";

import TextField from "@material-ui/core/TextField";
import { SET_DESCRIPTION, useEditorContext } from "./TodoEditorContext";


export const EditDescriptionSection = () => {
  const {todo, dispatch} = useEditorContext();

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({type: SET_DESCRIPTION, payload: e.target.value});

  return (
    <TextField
      multiline
      variant="standard"
      size={"small"}
      id={"task-description"}
      label={"Описание"}
      helperText={"Так, а делать-то что будем?"}
      value={todo.description}
      onChange={onDescriptionChange}
      fullWidth
    />
  )
};