import React from "react";

import TextField from "@material-ui/core/TextField";


export const EditTitleSection = ({value, onChange}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <TextField
      variant="standard"
      size={"small"}
      id={"task-title"}
      label={"Название"}
      helperText={"И как это все называется?"}
      value={value}
      onChange={onChangeHandler}
      error={!value}
      fullWidth
    />
  )
};