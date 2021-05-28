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
  SET_DURATION,
  SET_TITLE,
  useEditorContext
} from "./TodoEditorContext";

import {
  EditRemindersSection} from "./EditRemindersSection";

import { TodoEditorProps } from "./types";
import { EditTitleSection } from "./EditTitleSection";
import { EditDescriptionSection } from "./EditDescriptionSection";
import { EditStartDateSection } from "./EditStartDateSection";
import { EditDurationSection } from "./EditDurationSection";


export const TodoEditor: React.FC<TodoEditorProps> = ({onClose, onSave}) => {
  const [todoState, dispatch] = useEditorContext();

  const onCancelHandler = () => {
    onClose();
  };
  const onSaveHandler = () => {
    onSave(todoState);
    onClose();
  };

  const onChangeTitle = React.useCallback(
    (value) => dispatch({type: SET_TITLE, payload: value}),
    [dispatch]);

  const onChangeDecription = React.useCallback(
    (value) => dispatch({type: SET_DESCRIPTION, payload: value}),
    [dispatch]);

  const onChangeStartDate = React.useCallback(
    (value) => dispatch({type: SET_DATE, payload: value}),
    [dispatch]);

  const onChangeDuration = React.useCallback(
    (value) => dispatch({type: SET_DURATION, payload: value}),
    [dispatch]);

  const onChangeReminders = React.useCallback(
    (value) => dispatch({type: SET_DURATION, payload: value}),
    [dispatch]);

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
            <EditTitleSection
              value={todoState.title}
              onChange={onChangeTitle}
            />
          </Grid>

          <Grid item xs={12}>
            <EditDescriptionSection
              value={todoState.description}
              onChange={onChangeDecription}
            />
          </Grid>


          <Grid item xs={12}>
            <EditStartDateSection
              value={todoState.start_date}
              onChange={onChangeStartDate}
            />
          </Grid>


          <Grid item xs={6}>
            <EditDurationSection
              value={todoState.duration}
              onChange={onChangeDuration}
            />
          </Grid>

          <Grid item xs={12}>
            <EditRemindersSection
              value={todoState.reminders}
              onChange={onChangeReminders}
            />
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