import React, {Fragment, useCallback, useEffect, useState} from "react";

import axios from "axios/index";

import {Alert, Button, Col, Fade, Row, Breadcrumb} from "react-bootstrap";
import {Cached, Add} from '@material-ui/icons';
import {Fab} from '@material-ui/core';

import {TODOES_URL} from "../../settings/remoteAPI";
import {TodoEditor, TodoList, EMPTY_TODO_OBJECT} from "./parts";
import {listToObject} from "../../utils/common";
import {HOME_ROUTE} from "../../settings/routesPaths";


export const TODOPage = () => {
  const [todoList, setTodoList] = useState();

  const updateTodoList = () => axios
    .get(`${TODOES_URL}`) // TODO implement pagination
    .then(res => setTodoList(res.data.results));

  useEffect(() => {
    if (!todoList) updateTodoList();
  }, []);

  // TODO every time when todoInEditod changes, all entire component will rerender. That's wrong.
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

  const FloatControls = () => (
    <Row style={{position: "fixed", bottom: 20, right: 20}}>
      <Col sm="auto" className="pl-1">
        <Fab
          className="bg-success text-white mx-1"
          onClick={openNewTodoInEditor}
        >
          <Add/>
        </Fab>
        <Fab
          className="bg-info text-white mx-1"
          onClick={updateTodoList}
        >
          <Cached/>
        </Fab>
      </Col>
    </Row>
  );

  return (
    <Fragment>
      <Fade in={Boolean(todoList)}>
        <Col>
          <TodoList
            content={todoList}
            openTaskToEdit={useCallback(openTodoInEditor, [todoList])}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        </Col>
      </Fade>

      {
        showEditCard &&
        <TodoEditor
          show={showEditCard}
          editingTask={todoInEditor}
          closeEditor={closeTodoEditor}
          createTask={createTask}
          updateTask={updateTask}
        />
      }
      <FloatControls/>

    </Fragment>
  )
};