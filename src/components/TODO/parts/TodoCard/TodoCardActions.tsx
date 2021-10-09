import React from "react";

import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";

import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


export const TodoCardActions = ({todo, completed, expanded, openEditor}) => {
  return (
    <CardActions disableSpacing>
      {!completed && (
        <IconButton
          color="primary"
          onClick={() => alert("Not Implemented Error!")}
        >
          <CheckCircleIcon/>
        </IconButton>
      )}

      <IconButton
        color="secondary"
        onClick={() => alert("Not Implemented Error!")}
      >
        <DeleteForeverIcon/>
      </IconButton>

      <IconButton onClick={openEditor}>
        <EditIcon/>
      </IconButton>

    </CardActions>
  )
};