import React, {useEffect, useState, useCallback} from "react";

import axios from "axios/index";

import {Row, Col, Fade} from "react-bootstrap";

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

  return (
    <Row>
      <Fade in={Boolean(todoList)}>
        <Col>
          <TodoList
            content={todoList}
            editTask={useCallback(openTodoInEditor, [todoList])}
            addNewTask={useCallback(openNewTodoInEditor, [])}
            updateList={updateTodoList}
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

    </Row>
  )
};