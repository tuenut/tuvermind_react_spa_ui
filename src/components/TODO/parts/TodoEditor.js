import React, {useEffect, useState, useCallback, useRef} from "react";

import {Card, Form, Collapse, Button, Fade, Row, Col, Modal} from "react-bootstrap";


export const TodoEditor = ({editingTask, show, closeEditor, createTask, updateTask}) => {
  const [todo, setTodo] = useState(editingTask);
  const [reminder, setReminder] = useState({date: "", time: ""});

  const titleInput = useRef(null);

  const editTitle = e => setTodo({
    ...todo,
    title: e.target.value
  });
  const editDescription = e => setTodo({
    ...todo,
    description: e.target.value
  });
  const setReminderDate = e => setReminder({
    ...reminder,
    date: e.target.value
  });
  const setReminderTime = e => setReminder({
    ...reminder,
    time: e.target.value
  });

  useEffect(() => {
    // titleInput.current.focus();

    if (editingTask) setTodo(editingTask);
  }, [editingTask]);

  const todoIsDone = (todo.history && todo.history[0] && todo.history[0].completed);

  const EditorHeader = () => {
    return (
      <Modal.Header closeButton>
        <Modal.Title>
          {
            todo.id
              ? "Редактирование"
              : "Новая задача"
          }
        </Modal.Title>
      </Modal.Header>
    )
  };

  const EditorBody = () => {
    return (
      <Modal.Body>
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

          <Form.Group>
            <Form.Label>
              Напомнить
            </Form.Label>
            <Form.Row>
              <Col>
                <Form.Control type={"date"} value={reminder.date} onChange={setReminderDate}/>
              </Col>
              <Col>
                <Form.Control type={"time"} value={reminder.time} onChange={setReminderTime}/>
              </Col>
            </Form.Row>
          </Form.Group>

        </Form>
      </Modal.Body>
    );
  };

  const EditorFooter = () => {
    return (
      <Modal.Footer>
        <Button variant="secondary" onClick={closeEditor} children={"Закрыть"}/>
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
      </Modal.Footer>
    )
  };

  return (
    <Modal show={show} onHide={closeEditor}>
      <EditorHeader/>

      <EditorBody/>

      <EditorFooter/>
    </Modal>
  )
};