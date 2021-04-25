import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import TimePicker from '@material-ui/lab/TimePicker';

import {CRON, ICronTodo, IMemoTodo, ITodo, MEMO, TODO} from "../../../Store/Todoes/types";
import {SET_DATE, SET_DESCRIPTION, SET_DURATION, SET_TITLE, SET_TYPE, useEditorContext} from "./TodoEditorContext";


const EditDateSection = () => {
  const [todoState, dispatch] = useEditorContext();

  const onChange = (newValue: any) => dispatch({
    type: SET_DATE, payload: newValue
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            value={todoState.date}
            onChange={onChange}
            label="Когда начнем?"
            onError={console.log}
            minDate={new Date()}
            inputFormat="dd/MM/yyyy"
            mask="___/__/__ __:__"
            renderInput={(params) => <TextField {...params} margin="normal"/>}
          />
        </Grid>

        <Grid item xs={6}>
          <TimePicker
            orientation="landscape"
            value={todoState.date}
            onChange={onChange}
            label="А во сколько?"
            onError={console.log}
            inputFormat="HH:mm"
            mask="___/__/__ __:__"
            renderInput={(params) => <TextField {...params} margin="normal"/>}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
};

const EditTypeSection = () => {
  const [todoState, dispatch] = useEditorContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({
    type: SET_TYPE,
    payload: e.target.value
  });

  return (
    <TextField
      select
      fullWidth
      id={"task-type"}
      helperText={"Тип задачи"}
      value={todoState.type}
      onChange={onChange}
    >
      {[TODO, MEMO, CRON].map((item, idx) => (
        <MenuItem key={idx} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  )
};

const EditTitleSection = () => {
  const [todoState, dispatch] = useEditorContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({
    type: SET_TITLE,
    payload: e.target.value
  });

  return (
    <TextField
      id={"task-title"}
      label={"Название"}
      helperText={"И как это все называется?"}
      value={todoState.title}
      onChange={onChange}
      error={!todoState.title}
      fullWidth
    />
  )
};

const EditDescriptionSection = () => {
  const [todoState, dispatch] = useEditorContext();

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({
    type: SET_DESCRIPTION,
    payload: e.target.value
  });

  return (
    <TextField
      multiline
      id={"task-description"}
      label={"Описание"}
      helperText={"Так, а делать-то что будем?"}
      value={todoState.description}
      onChange={onDescriptionChange}
      fullWidth
    />
  )
};

const EditDurationSection = () => {
  const [todoState, dispatch] = useEditorContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({
    type: SET_DURATION,
    payload: e.target.value
  });

  return (
    <TextField
      id={"task-duration"}
      type={"number"}
      label={"Длительность"}
      helperText={"Ну, сколько это еще будет продолжаться?"}
      value={todoState.duration}
      onChange={onChange}
      fullWidth
    />
  )
};

interface TodoEditorProps {
   onClose: () => void,
  onSave: (todo: IMemoTodo | ITodo | ICronTodo) => void
}

export const TodoEditor: React.FC<TodoEditorProps> = ({onClose, onSave}) => {
  const [todoState] = useEditorContext();

  const onCancelHandler = () => {
    onClose();
  };
  const onSaveHandler = () => {
    // onSave(todoState); // TODO нужно перобразование todoState в объект соответсвующий типу задачи.
    onClose();
  };

  return (
    <React.Fragment>
      <DialogTitle>
        <EditTitleSection/>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>

          <Grid item xs={6}>
            <EditTypeSection/>
          </Grid>

          <Grid item xs={12}>
            <EditDescriptionSection/>
          </Grid>

          {([MEMO, TODO].includes(todoState.type)) && (
            <Grid item xs={12}>
              <EditDateSection/>
            </Grid>
          )}

          <Grid item xs={6}>
            <EditDurationSection/>
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