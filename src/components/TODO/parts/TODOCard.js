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
  Chip,
  Grid
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {v4 as uuidv4} from 'uuid';


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

export const TODOCard = ({todo, openTaskToEdit, completeTask, deleteTask}) => {
  const [expanded, setEpand] = React.useState(false);

  const classes = useStyles();

  const completionDate = todo.planned_completion_date
    ? new Date(`${todo.planned_completion_date}T${todo.planned_completion_time}`)
    : null;

  const onCardClick = () => openTaskToEdit(todo.id);

  const Reminders = ({titled}) => (
    <Fragment>
      {
        (todo.reminders.length > 0) &&
        <Typography paragraph color="textSecondary">
          {!titled && "Напоминания:"}
          <Grid container spacing={1}>
            {
              todo.reminders.slice(0, titled && 3).map(item => (
                <Grid item key={uuidv4()}>
                  <Chip size={"small"} label={`за ${item.value} ${item.dimension}`}/>
                </Grid>
              ))
            }
            {(titled && todo.reminders.length > 3) && "..."}
          </Grid>
        </Typography>
      }
    </Fragment>
  );

  return (
    <Card>
      <CardActionArea onClick={!todo.completed && onCardClick}>
        <CardHeader
          title={(
            <Typography color={todo.completed ? "primary" : "textPrimary"}>
              {todo.completed && <CheckCircleIcon color="primary"/>}
              <b>
                {todo.title}
              </b>
            </Typography>
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

      <CardActions disableSpacing>
        {
          !todo.completed &&
          <IconButton color="primary" onClick={() => completeTask(todo.id)}>
            <CheckCircleIcon/>
          </IconButton>
        }
        <IconButton color="secondary" onClick={() => deleteTask(todo.id)}>
          <DeleteForeverIcon/>
        </IconButton>

        {
          todo.description &&
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color="textPrimary">
            {todo.description}
          </Typography>

          <Reminders/>

          <Typography paragraph color="textSecondary">
            <Grid container>
              <Grid item xs={12}>
                <small>
                  Создано: {new Date(todo.created).toLocaleString("ru")}
                </small>
              </Grid>
              {
                (new Date(todo.updated) - new Date(todo.created) > 10000) &&
                <Grid item xs={12}>
                  <small>Обновлено: {new Date(todo.updated).toLocaleString("ru")}</small>
                </Grid>
              }
            </Grid>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};