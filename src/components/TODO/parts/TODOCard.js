import React, {Fragment} from "react";

import {Accordion, Card, Col, Row, Button, ButtonGroup, Dropdown, Alert} from "react-bootstrap";


export const TODOCard = ({todo, editTask, completeTask, deleteTask}) => {
  const todoIsDone = (todo.history && todo.history[0] && todo.history[0].completed);

  const TODOCardHeader = () => {
    return (
      <Dropdown as={Card.Header} className="border-bottom p-0" style={{fontSize: "60%"}}>
        <ButtonGroup className="w-100">
          <Accordion.Toggle as={Button} eventKey={`${todo.id}`} className="btn-light btn-block">
            {
              todoIsDone
                ? <s className="h5 text-success">{todo.title}</s>
                : <b className="h5">{todo.title}</b>
            }
          </Accordion.Toggle>
          <Dropdown.Toggle variant="light" className="border-0">

          </Dropdown.Toggle>
        </ButtonGroup>

        <Dropdown.Menu className="col col-sm-6 m-0 p-0">

          <ButtonGroup vertical className="w-100">
            <Alert variant={"light"} className="w-100">
              <Row className="justify-content-between">
                <Col xs="5">
                  <small>Создано:</small>
                </Col>
                <Col xs={"auto"} className="pl-0">
                  <small>{new Date(todo.created).toLocaleString("ru")}</small>
                </Col>
              </Row>
              {
                (new Date(todo.updated) - new Date(todo.created) > 10000) &&
                <Row className="justify-content-between">
                  <Col xs="5">
                    <small>Обновлено:</small>
                  </Col>
                  <Col xs={"auto"} className="pl-0">
                    <small>{new Date(todo.updated).toLocaleString("ru")}</small>
                  </Col>
                </Row>
              }
              {
                todoIsDone &&
                <Row className="justify-content-between text-success">
                  <Col xs="5">
                    <small>Завершено:</small>
                  </Col>
                  <Col xs={"auto"} className="pl-0">
                    <small>{new Date(todo.history[0].completed).toLocaleString("ru")}</small>
                  </Col>
                </Row>
              }
            </Alert>

            {
              !todoIsDone &&
              <Fragment>
                <Button
                  block
                  variant="info"
                  className=""
                  onClick={() => editTask(todo.id)}
                  children={"Редактировать"}
                />
                <Button
                  block
                  variant={"success"}
                  className=""
                  onClick={() => completeTask(todo)}
                  children={"Выполнить"}
                />
              </Fragment>
            }
            <Button
              block
              variant="danger"
              className=""
              onClick={() => deleteTask(todo)}
              children={"Удалить"}
            />
          </ButtonGroup>

        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const TODOCardBody = () => {
    return (
      <Card.Body className={`${todoIsDone && "text-muted"}`} style={{whiteSpace: "pre-wrap"}}>
        {todo.description}
      </Card.Body>
    );
  };

  return (
    <Card>
      <TODOCardHeader/>

      <Accordion.Collapse eventKey={`${todo.id}`}>
        <TODOCardBody/>
      </Accordion.Collapse>

    </Card>
  );
};