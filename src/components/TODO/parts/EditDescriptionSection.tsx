import React from "react";

import TextField from "@material-ui/core/TextField";


export const EditDescriptionSection = ({value, onChange}) => {
  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <TextField
      multiline
      variant="standard"
      size={"small"}
      id={"task-description"}
      label={"Описание"}
      helperText={"Так, а делать-то что будем?"}
      value={value}
      onChange={onDescriptionChange}
      fullWidth
    />
  )
};