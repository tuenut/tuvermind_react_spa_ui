import React, {useEffect, useState, useCallback} from "react";

import {Card, Form, Collapse, Button, Fade} from "react-bootstrap";


const defaultState = {
  title: "",
  description: ""
};

export const TODOEdit = ({todo: referenceTodo = defaultState, show}) => {
  const [todo, setTodo] = useState(defaultState);
  const [showRepeatableSettings, setShowRepeatableSettings] = useState(false);

  const showRepeatable = useCallback(() => setShowRepeatableSettings(!showRepeatableSettings));

  const editTitle = e => setTodo({...todo, title: e.target.value});
  const editDescription = e => setTodo({...todo, description: e.target.value});

  useEffect(() => {
    if (referenceTodo) setTodo(referenceTodo);

    return () => setTodo(defaultState)
  }, [referenceTodo.id]);

  return (

    <Fade in={show}>
      <Card id={"todoedit"}>
        <Card.Body>
          <Form onSubmit={e => e.preventDefault()}>

            <Form.Group>
              <Form.Label>
                Название
              </Form.Label>
              <Form.Control type={"text"} value={todo.title} onChange={editTitle}/>
              <Form.Text className="text-muted">
                Как корабль назовешь, так он и поплывет...
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Описание
              </Form.Label>
              <Form.Control as={"textarea"} value={todo.description} onChange={editDescription} rows={6}/>
              <Form.Text className="text-muted">
                Так, и чо делать будем?
              </Form.Text>
            </Form.Group>

            <Button block onClick={showRepeatable}>
              Настроить повторяемость
            </Button>
            <Collapse in={showRepeatableSettings}>
              <Form.Group>
                <Form.Label>
                  Периодичность
                </Form.Label>
              </Form.Group>
            </Collapse>

          </Form>
        </Card.Body>
      </Card>
    </Fade>
  )
};