import React, {Fragment} from "react";

import {Accordion, Alert, Col, Button, Row, CardColumns} from "react-bootstrap";

import {TODOCard} from "./TODOCard";


export const TodoList = (
  {content, editTask, updateList, addNewTask, completeTask, deleteTask}
) => {
  const TodoListHeader = () => {
    return (
      <Row className="justify-content-between mt-2 mb-3">
        <Col xs="auto" className="pr-1 flex-fill">
          <Alert variant="light" className="font-weight-bold text-dark h3 h-100 my-auto">
            Список задач
          </Alert>
        </Col>

        <Col xs="auto" className="pl-1">
          <Button
            variant="success"
            size="lg"
            className="border-0 h-100 mx-1"
            onClick={addNewTask}
          >
            Добавить
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="border-0 h-100 ml-1"
            onClick={updateList}
          >
            Обновить
          </Button>
        </Col>
      </Row>
    );
  };

  const TodoListContent = () => {
    return (
      <CardColumns>
        {content.map((item, index) =>
          <TODOCard
            key={`${item.id}.${index}`}
            todo={item}
            editTask={editTask}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        )}
      </CardColumns>
    );
  };

  return (
    <Fragment>
      <TodoListHeader/>
      {content && <TodoListContent/>}
    </Fragment>
  )
};