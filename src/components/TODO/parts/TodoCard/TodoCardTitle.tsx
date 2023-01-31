import React from "react";

import { DateTime } from "luxon";

import Typography from "@material-ui/core/Typography/Typography";
import Collapse from "@material-ui/core/Collapse/Collapse";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import { useTodoCardContext } from "./TodoCardContext";


export const TodoCardTitle = () => {
  const {todo, isCompleted, expanded, onClick} = useTodoCardContext();

  const color = isCompleted ? "primary" : "textPrimary";

  const startDateString = (todo.startDate &&  todo.startTime) && (
    `${todo.startDate.toLocaleString(DateTime.DATE_MED)} ` +
    `${todo.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}`
  );

  const title = (
    <Typography color={color} variant={"h5"}>
      {isCompleted && (<CheckCircleIcon color="primary"/>)}
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
    <CardActionArea onClick={onClick}>
      <CardHeader title={title} subheader={!isCompleted && startDateString}/>

      {content}
    </CardActionArea>
  );
};