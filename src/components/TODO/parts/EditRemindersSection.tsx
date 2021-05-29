import React from "react";

import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import MenuItem from '@material-ui/core/MenuItem';

import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from "@material-ui/lab/DateTimePicker";

import AdapterDateFns from "@date-io/luxon/";

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { SET_REMINDERS, useEditorContext } from "./TodoEditorContext";
import { useDateTimePickerStyles } from "./styles";


const ListItem = styled('li')(({theme}) => ({
  margin: theme.spacing(0.5),
}));


const RemindersList = ({reminders, onChange}) => {
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {reminders.map((value, idx) =>
        <ListItem key={`${value}.${idx}`}>
          <Chip
            label={value}
            onDelete={() => onChange([
              ...reminders.slice(0, idx),
              ...reminders.slice(idx + 1)
            ])}
          />
        </ListItem>
      )}
    </Grid>
  )
};


export const EditRemindersSection = ({reminders, onChange: onChangeReminders}) => {
  const classes = useDateTimePickerStyles();

  const [reminderDateTime, setReminderDateTime] = React.useState("");

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ( e.key === "Enter" ) {
      onChangeReminders([
        ...reminders,
        {when: reminderDateTime}
      ]);
      setReminderDateTime("");
    }
  }

  console.log({inputValue: reminderDateTime});

  const DateTimeRenderInput = (params) => (
    <TextField
      {...params}
      fullWidth
      variant="standard"
      size={"small"}
      onKeyPress={onPressEnter}
    />
  );

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          locale={"ru"}
        >
          <DateTimePicker
            showDaysOutsideCurrentMonth
            label="Когда напомнить?"
            inputFormat={"yyyy-MM-dd HH:mm"}
            mask={"____-__-__ __:__"}
            value={reminderDateTime}
            onChange={(value) => setReminderDateTime(value!)}
            renderInput={DateTimeRenderInput}
          />
        </LocalizationProvider>
      </Grid>

      {(reminders.length !== 0) && (
        <RemindersList reminders={reminders} onChange={onChangeReminders}/>
      )}
    </Grid>
  )
}