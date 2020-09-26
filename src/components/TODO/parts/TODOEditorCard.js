import React, {useEffect, useState, useCallback, useRef} from "react";

import {Card, Form, Collapse, Button, Fade, Row, Col} from "react-bootstrap";


export const TodoEditorCard = ({editingTask, show, closeEditor, createTask, updateTask}) => {
  const [todo, setTodo] = useState(editingTask);
  const [showRepeatableSettings, setShowRepeatableSettings] = useState(false);

  const titleInput = useRef(null);

  const showRepeatable = useCallback(() => setShowRepeatableSettings(!showRepeatableSettings));

  const editTitle = e => setTodo({
    ...todo,
    title: e.target.value
  });
  const editDescription = e => setTodo({
    ...todo,
    description: e.target.value
  });

  useEffect(() => {
    titleInput.current.focus();

    if (editingTask) setTodo(editingTask);
  }, [editingTask]);

  const todoIsDone = (todo.history && todo.history[0] && todo.history[0].completed);

  const EditorBody = () => {
    return (
      <Card.Body>
        <Form onSubmit={e => e.preventDefault()}>

          <Form.Group>
            <Form.Label>
              Название
            </Form.Label>
            <Form.Control ref={titleInput} type={"text"} value={todo.title} onChange={editTitle}/>
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

          <Button block variant="info" onClick={showRepeatable}>
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
    );
  };

  const EditorFooter = () => {
    return (
      <Card.Footer className="">
        <Row fluid="sm" className="justify-content-between">
          <Col xs={"4"} lg={"2"}>
            {
              todo.id
                ? <Button
                  disabled={todoIsDone || false}
                  variant="primary"
                  onClick={() => updateTask(todo)}
                  children={"Сохранить"}
                />
                : <Button
                  variant="success"
                  onClick={() => createTask(todo)}
                  children={"Создать"}
                />
            }
          </Col>
          <Col xs={"auto"}>
            <Button variant="danger" onClick={closeEditor} children={"Закрыть"}/>
          </Col>
        </Row>
      </Card.Footer>
    );
  };

  return (
    <Fade in={show}>
      <Card id={"todoedit"} className="my-2">
        <EditorBody/>
        <EditorFooter/>
      </Card>
    </Fade>
  )
};