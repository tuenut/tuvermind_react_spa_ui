import React from "react";

import { DateTime } from "luxon";

import Typography from "@material-ui/core/Typography/Typography";
import Collapse from "@material-ui/core/Collapse/Collapse";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';


export const TodoCardTitle =
  ({todo, completed, openEditor, expanded, onTitleClick}) => {
    const color = completed ? "primary" : "textPrimary";

    const startDateString = todo.hasOwnProperty("startDate") && (
      `${todo.startDate.toLocaleString(DateTime.DATE_MED)} ` +
      `${todo.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}`
    );

    const title = (
      <Typography color={color} variant={"h5"}>
        {completed && (<CheckCircleIcon color="primary"/>)}
        <b>{todo.title}</b>
      </Typography>
    );

    const content = (
      <Collapse in={!expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography noWrap>
            {todo.description}
          </Typography>

        </CardContent>
      </Collapse>
    );

    return (
      <CardActionArea onClick={onTitleClick}>
        <CardHeader title={title} subheader={!completed && startDateString}/>

        {content}
      </CardActionArea>
    );
  };