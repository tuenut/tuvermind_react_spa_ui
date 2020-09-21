import React from "react";

import {Accordion, Card, ListGroupItem, Col, Row, Button, ButtonGroup} from "react-bootstrap";


export const TODOListElement = ({id, title, description, created, updated, onEditClick}) => (
  <ListGroupItem>
    <Accordion.Toggle as={"div"} eventKey={`${id}`}>
      {title}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={`${id}`}>
      <Card border={"light"}>
        <Card.Header
          className="text-muted text-monospace text-right py-1"
          style={{fontSize: "70%"}}
        >
          <Row>
            <Col>
              Создано:
            </Col>
            <Col xs={"auto"} className="pl-0">
              {new Date(created).toLocaleString("ru")}
            </Col>
          </Row>
          {
            (new Date(updated) - new Date(created) > 10000) &&
            <Row>
              <Col>
                Обновлено:
              </Col>
              <Col xs={"auto"} className="pl-0">
                {new Date(updated).toLocaleString("ru")}
              </Col>
            </Row>
          }
        </Card.Header>

        <Card.Body>
          {description}
        </Card.Body>

        <Card.Footer>
          <Row className="justify-content-end">
            <ButtonGroup>

              <Button variant={"success"}>
                Выполнить
              </Button>

              <Button variant={"info"} onClick={() => onEditClick(id)}>
                Редактировать
              </Button>

              <Button variant={"danger"}>
                Удалить
              </Button>

            </ButtonGroup>
          </Row>
        </Card.Footer>

      </Card>
    </Accordion.Collapse>
  </ListGroupItem>
);