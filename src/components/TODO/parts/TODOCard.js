import React, {Fragment} from "react";

import {Card, Col, Row, Button, ButtonGroup, Dropdown, Alert} from "react-bootstrap";


export const TODOCard = ({todo, editTask, completeTask, deleteTask}) => {
  const TODOCardHeader = () => {
    return (
      <Dropdown as={Card.Header} className="border-bottom p-0" style={{fontSize: "60%"}}>
        <ButtonGroup className="w-100">
          {/*<Button block disabled variant={"light"}>*/}

          {/*</Button>*/}
          <Dropdown.Toggle
            variant={todo.completed ? "outline-success" : "outline-info"}
            className="border-0"
            bsPrefix="card-header">
            {
              todo.completed
                ? <s className="h5">{todo.title}</s>
                : <span className="h5 font-weight-bold">{todo.title}</span>
            }
          </Dropdown.Toggle>
        </ButtonGroup>

        <Dropdown.Menu className="col col-sm-6 col-md-10 col-lg-9 col-xl-8 m-0 p-0">

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
                todo.completed &&
                <Row className="justify-content-between text-success">
                  <Col xs="5">
                    <small><b>Завершено:</b></small>
                  </Col>
                  <Col xs={"auto"} className="pl-0">
                    <small><b>{new Date(todo.completed).toLocaleString("ru")}</b></small>
                  </Col>
                </Row>
              }
            </Alert>

            {
              !todo.completed &&
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
      <Card.Body className={`${todo.completed && "text-muted"}`} style={{whiteSpace: "pre-wrap"}}>
        {todo.description}
      </Card.Body>
    );
  };

  return (
    <Card>
      <TODOCardHeader/>
      <TODOCardBody/>
    </Card>
  );
};