import React, {Fragment, useCallback, useEffect, useState} from "react";

import axios from "axios/index";

import {Cached, Add} from '@material-ui/icons';
import {Box, Fab, Grid} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';

import {TODOES_URL} from "../../settings/remoteAPI";
import {TodoEditor, EMPTY_TODO_OBJECT, TODOCard} from "./parts";
import {listToObject} from "../../utils/common";
import {v4 as uuidv4} from "uuid";


const useStyles = makeStyles(theme => ({}));

const splitArrayToColumns = (array_, columnsCount = 1) => {
  let columns = Array.from(new Array(columnsCount), () => new Array(0));

  let counter = 0;
  for (const item of array_) {
    columns[counter].push(item);
    counter += 1;
    if (counter === (columnsCount)) counter = 0;
  }

  return columns;
};

export const TODOPage = () => {
  const [todoList, setTodoList] = useState([]);

  const updateTodoList = () => axios
    .get(`${TODOES_URL}`) // TODO implement pagination
    .then(res => setTodoList(res.data.results));

  useEffect(() => {
    updateTodoList();
  }, []);

  const theme = useTheme();
  const classes = useStyles();

  const breakpoints = [
    useMediaQuery(theme.breakpoints.up('lg')) && 4,
    useMediaQuery(theme.breakpoints.up('md')) && 3,
    useMediaQuery(theme.breakpoints.up('sm')) && 2,
    useMediaQuery(theme.breakpoints.up('xs')) && 1,
  ];
  const cols = breakpoints.find(x => x) || 1;

  const [todoInEditor, setTodoInEditor] = useState({...EMPTY_TODO_OBJECT});
  const [showEditCard, setShowEditCard] = useState(false);

  const openTodoInEditor = (id) => {
    setShowEditCard(true);
    setTodoInEditor(listToObject(todoList)[id]);
  };
  const closeTodoEditor = () => {
    setShowEditCard(false);
    setTodoInEditor({...EMPTY_TODO_OBJECT});
  };
  const openNewTodoInEditor = () => {
    setShowEditCard(true);
    setTodoInEditor({...EMPTY_TODO_OBJECT});
  };

  const createTask = useCallback((todoId) => {
    axios
      .post(TODOES_URL, todoId)
      .then(updateTodoList)
      .then(closeTodoEditor)
  }, []);
  const updateTask = useCallback((todo) => {
    axios
      .put(`${TODOES_URL}${todo.id}/`, todo)
      .then(updateTodoList)
      .then(closeTodoEditor)
  }, []);
  const completeTask = useCallback((todoId) => {
    return axios
      .get(`${TODOES_URL}${todoId}/complete`)
      .then(updateTodoList)
      .then(closeTodoEditor);
  }, []);
  const deleteTask = useCallback((todoId) => {
    axios
      .delete(`${TODOES_URL}${todoId}`)
      .then(updateTodoList)
      .then(closeTodoEditor);
  }, []);

  return (
    <Fragment>
      <Grid container spacing={2} alignContent="center">
        {splitArrayToColumns(todoList, cols).map(column => (
          <Grid item  xs={12 / cols} key={uuidv4()}>
            <Grid container spacing={2} alignContent="flex-start">

            {column.map(item =>
              <Grid item xs={12} key={uuidv4()}>
                <TODOCard
                  todo={item}
                  openTaskToEdit={openTodoInEditor}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                />
              </Grid>
            )}

            </Grid>
          </Grid>
        ))}
      </Grid>

      {showEditCard && (
        <TodoEditor
          show={showEditCard}
          editingTask={todoInEditor}
          closeEditor={closeTodoEditor}
          createTask={createTask}
          updateTask={updateTask}
        />
      )}

      <Box position="fixed" bottom={20} right={20}>
        <Grid container spacing={2}>
          <Grid item>
            <Fab onClick={openNewTodoInEditor}>
              <Add/>
            </Fab>
          </Grid>
          <Grid item>
            <Fab color="primary" onClick={updateTodoList}>
              <Cached/>
            </Fab>
          </Grid>
        </Grid>
      </Box>

    </Fragment>
  )
};