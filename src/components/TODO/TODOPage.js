import React, {useEffect, useState, useCallback, Fragment} from "react";

import axios from "axios/index";

import {Row, Col, Fade, Alert, Button} from "react-bootstrap";

import {TODOES_URL} from "../../settings/remoteAPI";
import {TodoEditor, TodoList} from "./parts";
import {listToObject} from "../../utils/common";

const emptyTodoObject = {
  id: "",
  title: "",
  description: "",
  reminders: []
};

export const TODOPage = () => {
  const [todoList, setTodoList] = useState();

  const updateTodoList = () => axios
    .get(`${TODOES_URL}`) // TODO implement pagination
    .then(res => setTodoList(res.data.results))
  ;

  useEffect(() => {
    if (!todoList) updateTodoList();
  }, []);

  // TODO every time when todoInEditod changes, all entire component will rerender. That's wrong.
  const [todoInEditor, setTodoInEditor] = useState({...emptyTodoObject});
  const [showEditCard, setShowEditCard] = useState(false);

  const openTodoInEditor = (id) => {
    setShowEditCard(true);
    setTodoInEditor(listToObject(todoList)[id]);
  };
  const closeTodoEditor = () => {
    setShowEditCard(false);
    setTodoInEditor({...emptyTodoObject});
  };
  const openNewTodoInEditor = () => {
    setShowEditCard(true);
    setTodoInEditor({...emptyTodoObject});
  };

  const createTask = useCallback((todo) => {
    axios
      .post(TODOES_URL, todo)
      .then(updateTodoList)
      .then(closeTodoEditor)
  }, []);
  const updateTask = useCallback((todo) => {
    axios
      .put(`${TODOES_URL}${todo.id}/`, todo)
      .then(updateTodoList)
      .then(closeTodoEditor)
  }, []);
  const completeTask = useCallback((todo) => {
    return axios
      .get(`${TODOES_URL}${todo.id}/complete`)
      .then(updateTodoList)
      .then(closeTodoEditor);
  }, []);
  const deleteTask = useCallback((todo) => {
    axios
      .delete(`${TODOES_URL}${todo.id}`)
      .then(updateTodoList)
      .then(closeTodoEditor);
  }, []);

  const TodoListHeader = () => {
    return (
      <Row className="justify-content-between mt-2 mb-3">
        <Col sm="auto" className="pr-1 flex-fill">
          <Alert variant="light" className="font-weight-bold text-dark h3 h-100 my-auto">
            Список задач
          </Alert>
        </Col>

        <Col sm="auto" className="pl-1">
          <Button
            variant="success"
            size="lg"
            className="border-0 h-100 mx-1"
            onClick={openNewTodoInEditor}
          >
            Добавить
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="border-0 h-100 ml-1"
            onClick={updateTodoList}
          >
            Обновить
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Fragment>
      <TodoListHeader/>

      <Fade in={Boolean(todoList)}>
        <Col>
          <TodoList
            content={todoList}
            editTask={useCallback(openTodoInEditor, [todoList])}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        </Col>
      </Fade>

      <TodoEditor
        editingTask={todoInEditor}
        show={showEditCard}
        closeEditor={useCallback(closeTodoEditor, [])}
        createTask={createTask}
        updateTask={updateTask}
      />

    </Fragment>
  )
};