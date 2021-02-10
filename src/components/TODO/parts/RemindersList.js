import React, {Fragment} from "react";

import {Chip, Grid, Typography} from '@material-ui/core';

import {v4 as uuidv4} from "uuid";


export const RemindersList = ({list}) => list
  ? (
    <Fragment>
      <Typography paragraph color="textSecondary">
        <Typography>Напоминания:</Typography>

        <Grid container spacing={1}>
          {list.map(item => (
            <Grid item key={uuidv4()}>
              <Chip size={"small"} label={`за ${item.value} ${item.units}`}/>
            </Grid>
          ))}
        </Grid>
      </Typography>
    </Fragment>
  ) : (
    <Fragment/>
  );