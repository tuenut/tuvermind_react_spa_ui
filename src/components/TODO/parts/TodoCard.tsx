import React from 'react';

import clsx from 'clsx';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Fade
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import Chip from "@material-ui/core/Chip";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {ICronTodo} from "../../../Store/Todoes/types";
import {IMemoTodo, ITodo} from "../../../Store/Todoes/types";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


const TodoCardTitle = ({todo, completed, openEditor, expanded}) => {
  const color = completed ? "primary" : "textPrimary";
  const fade = expanded && !completed;

  const subheader = todo.hasOwnProperty("data") && (todo.date.toLocaleString("ru"));

  const title = (
    <Grid container>
      <Grid item xs={12}>
        <Typography color={color}>
          {completed && (
            <CheckCircleIcon color="primary"/>
          )}
          <b>{todo.title}</b>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Chip label={todo.type} color={"primary"} variant={"outlined"} size={"small"}/>
      </Grid>
    </Grid>
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

  if (expanded) {
    const action = (
      <Fade in={fade}>
        <IconButton onClick={openEditor}>
          <EditIcon/>
        </IconButton>
      </Fade>
    );

    return (
      <React.Fragment>
        <CardHeader title={title} action={action} subheader={subheader}/>

        {content}
      </React.Fragment>
    );

  } else {
    return (
      <CardActionArea onClick={openEditor}>
        <CardHeader title={title} subheader={subheader}/>

        {content}
      </CardActionArea>
    );
  }
};


const Actions = ({todo, completed, expanded, setExpand}) => {
  const classes = useStyles();

  return (
    <CardActions disableSpacing>
      {!completed && (
        <IconButton color="primary" onClick={() => null}>
          <CheckCircleIcon/>
        </IconButton>
      )}

      <IconButton color="secondary" onClick={() => null}>
        <DeleteForeverIcon/>
      </IconButton>

      {todo.description && (
        <IconButton
          className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
          onClick={() => setExpand(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon/>
        </IconButton>
      )}

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
            Создано: {new Date(todo.created).toLocaleString("ru")}
          </small>

          {showUpdate && (
            <React.Fragment>
              <br/>
              <small>
                Обновлено: {new Date(todo.updated).toLocaleString("ru")}
              </small>
            </React.Fragment>
          )}

        </Typography>
      </CardContent>
    </Collapse>
  );
};


export const TodoCard: React.FC<{
  todo: ITodo | ICronTodo | IMemoTodo,
  openTodoInEditor
}> = ({todo, openTodoInEditor}) => {
  const [expanded, setExpand] = React.useState(false);

  const isCompleted = !(
    (todo.status === "suspense") ||
    (todo.status === "inProcess")
  );

  const onCardClick = () => null;

  return (
    <Card>
      <TodoCardTitle
        todo={todo}
        expanded={expanded}
        completed={isCompleted}
        openEditor={isCompleted ? onCardClick : openTodoInEditor}
      />
      <Actions
        todo={todo}
        expanded={expanded}
        completed={isCompleted}
        setExpand={setExpand}
      />
      <Content todo={todo} expanded={expanded}/>
    </Card>
  );
};