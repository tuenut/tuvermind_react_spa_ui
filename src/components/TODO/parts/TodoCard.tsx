import React from 'react';

import { DateTime } from "luxon";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';

import { TodoCardProps } from "./types";


const TodoCardTitle = ({todo, completed, openEditor, expanded, onTitleClick}) => {
  const color = completed ? "primary" : "textPrimary";

  const subheader = todo.hasOwnProperty("startDate") && (
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
      <CardHeader title={title} subheader={!completed && subheader}/>

      {content}
    </CardActionArea>
  );
};


const Actions = ({todo, completed, expanded, openEditor}) => {
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


const Content = ({todo, expanded}) => {
  const showUpdate = (new Date(todo.updated).valueOf() - new Date(todo.created).valueOf()) > 10000;

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>

        <Typography paragraph color="textPrimary">
          {todo.description}
        </Typography>

        <Typography paragraph color="textSecondary">
          <small>
            Создано: {todo.created.toLocaleString(DateTime.DATETIME_MED)}
          </small>

          {showUpdate && (
            <React.Fragment>
              <br/>
              <small>
                Обновлено: {todo.updated.toLocaleString(DateTime.DATETIME_MED)}
              </small>
            </React.Fragment>
          )}
        </Typography>

      </CardContent>
    </Collapse>
  );
};


export const TodoCard: React.FC<TodoCardProps> = ({todo}) => {
  const [expanded, setExpand] = React.useState(false);

  const expandCollaapseCard = React.useCallback(
    () => setExpand(!expanded),
    [expanded]
  );

  const isCompleted = React.useMemo(() =>
      !((todo.status === "suspense") || !(todo.status === "inProcess"))
    , [todo]
  );

  const openEditor = React.useCallback(
    () => {
      if ( !isCompleted ) alert("Not Implemented Error!");
    },
    [todo.id, isCompleted]
  );

  return (
    <Card>
      <TodoCardTitle
        todo={todo}
        expanded={expanded}
        completed={isCompleted}
        openEditor={openEditor}
        onTitleClick={expandCollaapseCard}
      />
      <Actions
        todo={todo}
        expanded={expanded}
        completed={isCompleted}
        openEditor={openEditor}
      />
      <Content todo={todo} expanded={expanded}/>
    </Card>
  );
};