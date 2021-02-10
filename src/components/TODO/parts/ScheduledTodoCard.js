import React, {Fragment} from "react";

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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {RemindersList} from "./RemindersList";


const useStyles = makeStyles((theme) => ({
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


export const ScheduledTodoCard = ({todo, openTaskToEdit, completeTask, deleteTask}) => {
  const [expanded, setEpand] = React.useState(false);

  const classes = useStyles();

  const completionDate = todo.planned_completion_date
    ? new Date(`${todo.planned_completion_date}T${todo.planned_completion_time}`)
    : null;

  const onCardClick = () => openTaskToEdit(todo.id);

  const TitleHead = () => (
    <CardActionArea onClick={!todo.completed && onCardClick}>
      <CardHeader
        title={(
          <Typography color={todo.completed ? "primary" : "textPrimary"}>
            {todo.completed &&
             <CheckCircleIcon color="primary"/>
            }
            <b>{todo.title}</b>
          </Typography>
        )}
        action={(
          <Fade in={expanded && !todo.completed}>
            <IconButton>
              <EditIcon/>
            </IconButton>
          </Fade>
        )}
        subheader={completionDate && completionDate.toLocaleString("ru")}
      />

      <Collapse in={!expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography noWrap>
            {todo.description}
          </Typography>

        </CardContent>
      </Collapse>
    </CardActionArea>
  );

  const Actions = () => (
    <CardActions disableSpacing>
      {!todo.completed &&
       <IconButton color="primary" onClick={() => completeTask(todo.id)}>
         <CheckCircleIcon/>
       </IconButton>
      }
      <IconButton color="secondary" onClick={() => deleteTask(todo.id)}>
        <DeleteForeverIcon/>
      </IconButton>

      {todo.description &&
       <IconButton
         className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
         onClick={() => setEpand(!expanded)}
         aria-expanded={expanded}
         aria-label="show more"
       >
         <ExpandMoreIcon/>
       </IconButton>
      }

    </CardActions>
  );

  const Content = () => (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph color="textPrimary">
          {todo.description}
        </Typography>

        {/*<RemindersList list={todo.reminders}/>*/}

        <Typography paragraph color="textSecondary">
          <Grid container>
            <Grid item xs={12}>
              <small>
                Создано: {new Date(todo.created).toLocaleString("ru")}
              </small>
            </Grid>
            {(new Date(todo.updated) - new Date(todo.created) > 10000) &&
             <Grid item xs={12}>
               <small>Обновлено: {new Date(todo.updated).toLocaleString("ru")}</small>
             </Grid>
            }
          </Grid>
        </Typography>
      </CardContent>
    </Collapse>
  );

  return (
    <Card>
      <TitleHead/>
      <Actions/>
      <Content/>
    </Card>
  );
};