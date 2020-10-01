import React, {useEffect, useState, useCallback, useRef} from "react";

import {Card, Form, Collapse, Button, Fade, Row, Col, Modal} from "react-bootstrap";
import {getDateTime} from "../../../utils/common";


export const TodoEditor = ({editingTask, show, closeEditor, createTask, updateTask}) => {
  const [todo, setTodo] = useState(editingTask);

  const editTitle = e => setTodo({
    ...todo,
    title: e.target.value
  });
  const editDescription = e => setTodo({
    ...todo,
    description: e.target.value
  });
  const setReminderDate = (value, idx) => {
    console.log(value);

    let reminders = [...todo.reminders];
    const time = reminders[idx] ? getDateTime(reminders[idx]).time : "";

    reminders[idx] = new Date(`${value}T${time}`);

    setTodo({
      ...todo,
      reminders: [...reminders]
    });
  };
  const setReminderTime = (value, idx) => {
    console.log(value);

    let reminders = [...todo.reminders];
    const date = reminders[idx] ? getDateTime(reminders[idx]).date : "";

    reminders[idx] = new Date(`${date}T${value}`);

    setTodo({
      ...todo,
      reminders: [...reminders]
    });
  };

  useEffect(() => {
    setTodo(editingTask);
  }, [show]);

  const todoIsDone = (todo.history && todo.history[0] && todo.history[0].completed);

  return (
    <Modal show={show} onHide={closeEditor}>
      <Modal.Header closeButton>
        <Modal.Title>
          {
            todo.id
              ? "Редактирование"
              : "Новая задача"
          }
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
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

          <Form.Group>
            <Form.Label>
              Напомнить
            </Form.Label>
            {
              todo.reminders.map((item, idx) =>
                <Form.Row key={idx}>
                  <Form.Group as={Col}>
                    <Form.Control
                      type={"date"}
                      value={getDateTime(item).date}
                      onChange={e => setReminderDate(e.target.value ? e.target.value : getDateTime().date, idx)}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      type={"time"}
                      value={getDateTime(item).time}
                      onChange={e => setReminderTime(e.target.value ? e.target.value : getDateTime().time, idx)}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      block
                      variant={"danger"}
                      onClick={
                        () => setTodo({
                          ...todo,
                          reminders: [
                            ...todo.reminders.slice(0, idx),
                            ...todo.reminders.slice(idx + 1, todo.reminders.length)
                          ]
                        })
                      }
                      children={"-"}
                    />
                  </Form.Group>
                </Form.Row>
              )
            }
            <Button
              block
              variant={"success"}
              className="my-2"
              onClick={() => setTodo({...todo, reminders: [...todo.reminders, new Date()]})}
              children={"+"}
            />
          </Form.Group>

        </Form>
      </Modal.Body>

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
    </Modal>
  )
};