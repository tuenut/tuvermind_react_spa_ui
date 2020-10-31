import React, {Fragment} from "react";

import {
  Card,
  Col,
  Row,
  Button,
  ButtonGroup,
  Dropdown,
  Alert,
  ListGroup,
  ListGroupItem,
  Tooltip,
  OverlayTrigger,
  Badge
} from "react-bootstrap";

import {v4 as uuidv4} from 'uuid';


export const TODOCard = ({todo, openTaskToEdit, completeTask, deleteTask}) => {
  const completionDate = todo.planned_completion_date
    ? new Date(`${todo.planned_completion_date}T${todo.planned_completion_time}`)
    : null;

  const TODOCardHeader = () => {
    return (
      <Dropdown as={Card.Header} className="border-bottom p-0">
        <ButtonGroup className="w-100">
          {todo.completed ? (
            <Button
              className="border-0 w-100 btn-outline-success"
              bsPrefix="card-header"
              onClick={() => openTaskToEdit(todo.id)}
              disabled={todo.completed}
            >
              <s className="h5">{todo.title}</s>
            </Button>
          ) : (
            <OverlayTrigger
              placement={"bottom"}
              overlay={<Tooltip>Редактировать</Tooltip>}
            >
              <Button
                className="border-0 w-100 bg-light"
                bsPrefix="card-header"
                onClick={() => openTaskToEdit(todo.id)}
                disabled={todo.completed}
              >
                <span className="h5 font-weight-bold">{todo.title}</span>
              </Button>
            </OverlayTrigger>
          )}
          <Dropdown.Toggle variant={"outline-dark"} className="border-0 bg-light" style={{borderBottomRightRadius: 0}}/>
        </ButtonGroup>

        <Dropdown.Menu className="col col-sm-6 col-md-10 col-lg-9 col-xl-8 m-0 p-0">

          <ButtonGroup vertical className="w-100">
            <Alert variant={"light"} className="w-100 border-bottom">
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
                  variant={"outline-success"}
                  className="font-weight-bold border-0"
                  onClick={() => completeTask(todo.id)}
                  children={"Выполнить"}
                />
              </Fragment>
            }
            <Button
              block
              variant="outline-danger"
              className="font-weight-bold border-0"
              onClick={() => deleteTask(todo.id)}
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
        {
          completionDate &&
          <Row className="text-muted small mb-2">
            <Col>
              Крайний срок:
            </Col>
            <Col className="text-monospace text-right">
              {completionDate.toLocaleString("ru")}
            </Col>
          </Row>
        }
        <Row>
          <Col>
            {todo.description}
          </Col>
        </Row>
      </Card.Body>
    );
  };

  const TODOCardFooter = () => {
    return (
      <Card.Footer className="text-muted small">
        {"Напомнить "}
        {
          todo.reminders.map(item => (
            <h6 className="d-inline">
              <Badge variant={"secondary"} key={uuidv4()}>
                за {item.value} {item.dimension}
              </Badge>
              {" "}
            </h6>
          ))
        }
      </Card.Footer>
    )
  };

  return (
    <Card>
      <TODOCardHeader/>
      <TODOCardBody/>

      {
        (todo.reminders.length > 0) &&
        <TODOCardFooter/>
      }
    </Card>
  );
};