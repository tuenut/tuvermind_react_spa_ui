import React from "react";

import TextField from "@material-ui/core/TextField";

export const EditDurationSection = ({value, onChange}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <TextField
      variant="standard"
      size={"small"}
      id={"task-duration"}
      type={"number"}
      label={"Длительность"}
      helperText={"Ну, сколько это еще будет продолжаться?"}
      value={value || ""}
      onChange={onChangeHandler}
      fullWidth
    />
  )
};