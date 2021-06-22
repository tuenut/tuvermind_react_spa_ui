import React from 'react';

import {DateTime} from "luxon";

import clsx from 'clsx';

// import { useDispatch } from "react-redux";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Fade,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {useTodoCardStyles} from "./styles";

import {TodoCardProps} from "./types";


const TodoCardTitle = ({todo, completed, openEditor, expanded, onTitleClick}) => {
  const color = completed ? "primary" : "textPrimary";

  const subheader = todo.hasOwnProperty("startDate") &&
    todo.startDate.toLocaleString(DateTime.DATE_MED)
    + " "
    + todo.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)
  ;

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
  const classes = useTodoCardStyles();

  // const dispatch = useDispatch();

  return (
    <CardActions disableSpacing>
      {!completed && (
        <IconButton
          color="primary"
          // onClick={() => dispatch(completeTodo(todo.id))}
        >
          <CheckCircleIcon/>
        </IconButton>
      )}

      <IconButton
        color="secondary"
        // onClick={() => dispatch(deleteTodo(todo.id))}
      >
        <DeleteForeverIcon/>
      </IconButton>


      <IconButton onClick={openEditor}>
        <EditIcon/>
      </IconButton>

      {/*{todo.description && (*/}
      {/*<IconButton*/}
      {/*className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}*/}
      {/*onClick={() => setExpand(!expanded)}*/}
      {/*aria-expanded={expanded}*/}
      {/*aria-label="show more"*/}
      {/*>*/}
      {/*<ExpandMoreIcon/>*/}
      {/*</IconButton>*/}
      {/*)}*/}

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


export const TodoCard: React.FC<TodoCardProps> = ({todo, openTodoInEditor}) => {
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
      if (!isCompleted) openTodoInEditor(todo.id);
    },
    [todo.id, isCompleted, openTodoInEditor]
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