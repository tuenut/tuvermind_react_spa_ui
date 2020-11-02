import React, {useEffect, useState, Fragment} from "react";

import {Form, Button, Row, Col, Modal, Alert} from "react-bootstrap";

import {v4 as uuidv4} from 'uuid';

import {EMPTY_REMINDER} from "./common";


const cleanTodoObjectForAPI = todo => ({
  ...todo,
  reminders: (todo.planned_completion_date && todo.planned_completion_time)
    ? todo.reminders.map(item => ({value: item.value, dimension: item.dimension}))
    : [],
  planned_completion_date: todo.planned_completion_date || null,
  planned_completion_time: todo.planned_completion_time || null,
});
const prepareTodoForUI = todo => ({
  ...todo,
  reminders: todo.reminders
    ? todo.reminders.map(value => ({...value, key: uuidv4()}))
    : []
});

const Title = ({title, setTitle}) => (
  <Form.Group>
    <Form.Label>
      Название
    </Form.Label>

    <Form.Control
      type={"text"}
      value={title}
      onChange={e => setTitle(e.target.value)}
    />

    <Form.Text className="text-muted">
      Как корабль назовешь, так он и поплывет...
    </Form.Text>
  </Form.Group>
);

const CompletionDateTime = ({date, time, setDate, setTime}) => (
  <Form.Group>
    <Form.Label>
      Когда
    </Form.Label>

    <Form.Row>
      <Form.Group as={Col} className="mb-0">
        <Form.Control
          type={"date"}
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-0">
        <Form.Control
          type={"time"}
          value={time}
          onChange={e => setTime(e.target.value)}
          disabled={!Boolean(date)}
        />
      </Form.Group>
    </Form.Row>

    <Form.Text className="text-muted">
      И чо, когда уже покончим с этим?
    </Form.Text>
  </Form.Group>
);

const Description = ({description, setDescription}) => (
  <Form.Group>
    <Form.Label>
      Описание
    </Form.Label>

    <Form.Control
      as={"textarea"}
      value={description}
      onChange={e => setDescription(e.target.value)}
      rows={6}
    />

    <Form.Text className="text-muted">
      Так, и чо делать будем?
    </Form.Text>
  </Form.Group>
);

const Reminder = ({item, setReminder, delReminder}) => (
  <Form.Row>
    <Form.Group as={Col}>
      <Form.Control
        type={"number"}
        value={item.value}
        onChange={e => setReminder({...item, value: e.target.value})}
      />
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Control
        as={"select"}
        value={item.dimension}
        onChange={e => setReminder({...item, dimension: e.target.value})}
      >
        <option value={"min"}>минут</option>
        <option value={"hour"}>часов</option>
        <option value={"day"}>дней</option>
        <option value={"week"}>недель</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} className="col-1">
      <Button
        block
        variant={"danger"}
        onClick={() => delReminder(item.key)}
      >
        -
      </Button>
    </Form.Group>

  </Form.Row>
);

const Reminders = ({enabled, reminders, setReminder, delReminder, addReminder}) => (
  <Form.Group>
    {
      enabled ? (
        <Fragment>
          <Form.Label>
            Напомнить за
          </Form.Label>

          {reminders.map(item =>
            <Reminder
              key={item.key}
              item={item}
              setReminder={setReminder}
              delReminder={delReminder}
            />
          )}

          <Button block variant={"success"} className="my-2" onClick={addReminder}>
            +
          </Button>
        </Fragment>
      ) : (
        <Alert variant={"secondary"}>
          Для настройки напоминаний нужно указать дату и время события
        </Alert>
      )
    }
  </Form.Group>
);

export const TodoEditor = ({editingTask, show, closeEditor, createTask, updateTask}) => {
  const [todo, setTodo] = useState(prepareTodoForUI(editingTask));

  const setTitle = value => setTodo({...todo, title: value});
  const setCompletionDate = date => setTodo({...todo, planned_completion_date: date});
  const setCompletionTime = time => setTodo({...todo, planned_completion_time: time});
  const setDescription = text => setTodo({...todo, description: text});

  const setReminder = (item) => {
    const index = todo.reminders.findIndex(obj => obj.key === item.key);

    setTodo({
      ...todo,
      reminders: [...todo.reminders.slice(0, index), item, ...todo.reminders.slice(index + 1)]
    });
  };

  const addReminder = () => setTodo({
    ...todo,
    reminders: [...todo.reminders, {...EMPTY_REMINDER, key: uuidv4()}]
  });

  const delReminder = (key) => {
    const index = todo.reminders.findIndex(obj => obj.key === key);

    setTodo({
      ...todo,
      reminders: [
        ...todo.reminders.slice(0, index),
        ...todo.reminders.slice(index + 1)
      ]
    });
  };

  return (
    <Modal show={show} onHide={closeEditor} style={{paddingTop: 36}} className="my-3">
      {
        show &&
        <Fragment>
          <Modal.Header closeButton>
            <Modal.Title>
              {todo.id ? "Редактирование" : "Новая задача"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>

              <Title
                title={todo.title}
                setTitle={setTitle}
              />
              <CompletionDateTime
                date={todo.planned_completion_date}
                time={todo.planned_completion_time}
                setDate={setCompletionDate}
                setTime={setCompletionTime}
              />
              <Description
                description={todo.description}
                setDescription={setDescription}
              />
              <Reminders
                enabled={(todo.planned_completion_date && todo.planned_completion_time)}
                reminders={todo.reminders}
                setReminder={setReminder}
                delReminder={delReminder}
                addReminder={addReminder}
              />

            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditor} children={"Закрыть"}/>
            {
              todo.id ? (
                <Button
                  disabled={todo.completed || false}
                  variant="primary"
                  onClick={() => updateTask(cleanTodoObjectForAPI(todo))}
                  children={"Сохранить"}
                />
              ) : (
                <Button
                  variant="success"
                  onClick={() => createTask(cleanTodoObjectForAPI(todo))}
                  children={"Создать"}
                />
              )
            }
          </Modal.Footer>
        </Fragment>
      }
    </Modal>
  )
};