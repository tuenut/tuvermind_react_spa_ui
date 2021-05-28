import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import TimePicker from "@material-ui/lab/TimePicker";

import AdapterDateFns from "@date-io/date-fns/";


export const EditStartDateSection = ({value, onChange}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            value={value}
            onChange={onChange}
            label="Когда начнем?"
            onError={console.log}
            minDate={new Date()}
            inputFormat="yyyy/MM/dd"
            mask="___/__/__"
            renderInput={(params) => <TextField {...params} margin="normal"/>}
          />
        </Grid>

        <Grid item xs={6}>
          <TimePicker
            orientation="landscape"
            value={value}
            onChange={onChange}
            label="А во сколько?"
            onError={console.log}
            inputFormat="HH:mm"
            mask="__:__"
            renderInput={(params) => <TextField {...params} margin="normal"/>}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
};