import React from "react";

import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import {
  SET_DATE,
  SET_DESCRIPTION,
  SET_DURATION, SET_REMINDERS,
  SET_TITLE,
  useEditorContext
} from "./TodoEditorContext";

import { EditTitleSection } from "./EditTitleSection";
import { EditDescriptionSection } from "./EditDescriptionSection";
import { EditStartDateSection } from "./EditStartDateSection";
import { EditDurationSection } from "./EditDurationSection";
import { EditRemindersSection } from "./EditRemindersSection";


export const TodoEditor = ({onClose, onSave}) => {
  const [todoState, dispatch] = useEditorContext();

  const onCancelHandler = () => {
    onClose();
  };
  const onSaveHandler = () => {
    console.log("onSaveHandler");

    onSave(todoState);
    onClose();
  };

  return (
    <React.Fragment>
      <DialogTitle>
        <Typography>
          {todoState.id ? "Редактирование задачи" : "Новая задача"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <EditTitleSection/>
          </Grid>

          <Grid item xs={12}>
            <EditDescriptionSection/>
          </Grid>


          <Grid item xs={12}>
            <EditStartDateSection/>
          </Grid>


          <Grid item xs={6}>
            <EditDurationSection/>
          </Grid>

          <Grid item xs={12}>
            <EditRemindersSection/>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancelHandler} color={"secondary"}>
          Отмена
        </Button>
        <Button onClick={onSaveHandler} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </React.Fragment>
  )
};