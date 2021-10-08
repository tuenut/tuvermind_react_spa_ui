import React from "react";

import TextField from "@material-ui/core/TextField";
import { SET_DURATION, useEditorContext } from "./TodoEditorContext";

export const EditDurationSection = () => {
  const {todo, dispatch} = useEditorContext();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
     dispatch({type: SET_DURATION, payload: parseInt(e.target.value)});

  return (
    <TextField
      variant="standard"
      size={"small"}
      id={"task-duration"}
      type={"number"}
      label={"Длительность"}
      helperText={"Ну, сколько это еще будет продолжаться?"}
      value={todo.duration ? todo.duration.toString() : ""}
      onChange={onChangeHandler}
      fullWidth
    />
  )
};