import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import TimePicker from "@material-ui/lab/TimePicker";

import AdapterDateFns from "@date-io/luxon/";

import { SET_DATE, SET_TIME, useEditorContext } from "./TodoEditorContext";


export const EditStartDateSection = () => {
  const {todo, dispatch} = useEditorContext();

  const onChangeStartDate = (value) =>
    dispatch({type: SET_DATE, payload: value});

  const onChangeStartTime = (value) =>
    dispatch({type: SET_TIME, payload: value});

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={"ru"}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            showDaysOutsideCurrentMonth
            value={todo.startDate}
            onChange={onChangeStartDate}
            label="Когда начнем?"
            onError={console.log}
            minDate={new Date()}
            inputFormat="yyyy-MM-dd"
            mask="___-__-__"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                size={"small"}
                margin="normal"
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TimePicker
            value={todo.startTime}
            onChange={onChangeStartTime}
            label="А во сколько?"
            inputFormat="HH:mm"
            mask="__:__"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                size={"small"}
                margin="normal"
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
};