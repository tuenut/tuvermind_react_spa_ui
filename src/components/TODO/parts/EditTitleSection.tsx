import React from "react";

import TextField from "@material-ui/core/TextField";
import { SET_TITLE, useEditorContext } from "./TodoEditorContext";


export const EditTitleSection = () => {
  const [{title}, dispatch] = useEditorContext();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({type: SET_TITLE, payload: e.target.value});

  return (
    <TextField
      variant="standard"
      size={"small"}
      id={"task-title"}
      label={"Название"}
      helperText={"И как это все называется?"}
      value={title}
      onChange={onChangeHandler}
      error={!title}
      fullWidth
    />
  )
};