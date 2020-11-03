import React, {Fragment} from "react";

import clsx from 'clsx';

// import {
//   // Card,
//   Col,
//   Row,
//   Button,
//   ButtonGroup,
//   Dropdown,
//   Alert,
//   ListGroup,
//   ListGroupItem,
//   Tooltip,
//   OverlayTrigger,
//   Badge
// } from "react-bootstrap";


import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
  Menu,
  MenuItem,
  MenuList,
  makeStyles,
  Chip,
  Grid
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const completionDate = todo.planned_completion_date
    ? new Date(`${todo.planned_completion_date}T${todo.planned_completion_time}`)
    : null;


  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        title={(
          <Typography color={todo.completed ? "textSecondary" : "textPrimary"}>
            {todo.title}
          </Typography>
        )}
        subheader={completionDate && completionDate.toLocaleString("ru")}
        action={(
          <div>
            <IconButton onClick={openMenu}>
              <MoreVertIcon/>
            </IconButton>
            <Menu
              id={"todo" + todo.id + todo.key}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuList>
                <MenuItem onClick={() => completeTask(todo.id)}>
                  Выполнить
                </MenuItem>
                <MenuItem onClick={() => deleteTask(todo.id)}>
                  Удалить
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}
      />

      <CardContent>
        <Typography>
          {todo.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton color="primary">
          <CheckCircleIcon/>
        </IconButton>
        <IconButton color="secondary">
          <DeleteForeverIcon/>
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
          onClick={() => setEpand(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon/>
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color="textSecondary">
            Напоминания:
            <Grid container spacing={1}>
              {
                (todo.reminders.length > 0) &&
                todo.reminders.map(item => (
                  <Grid item>
                    <Chip size={"small"} label={`за ${item.value} ${item.dimension}`}/>
                  </Grid>
                ))
              }
            </Grid>
          </Typography>

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