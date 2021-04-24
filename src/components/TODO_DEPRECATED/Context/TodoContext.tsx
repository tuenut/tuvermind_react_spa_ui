import React from 'react';

import {IMemoTodo, ITodo, ICronTodo} from "./TodoContextTypes";
/*
* TODO по идее, надо делать задачи с расписанием как шаблонные а из них спавнить новые мелкие объекты,
* когда текущий период закончился.
* */

const DAY = 60 * 60 * 24 * 1000;

const suspenseMemoTodo: IMemoTodo = {
  id: 1,
  type: "MEMO",
  title: "Buy milk",
  description: null,
  duration: null,
  status: "suspense",
  date: new Date(new Date().valueOf() + DAY)
    .setHours(18, 30, 0, 0), // Tomorrow 18:30
  created: new Date(new Date().valueOf() - DAY)
    .setHours(20, 12, 0, 0), // Yesterday 20:12
  updated: new Date(new Date().valueOf() - DAY)
    .setHours(20, 12, 0, 0), // Yesterday 20:12
};
const suspenseTodo: ITodo = {
  id: 2,
  type: "TODO",
  title: "Do homework",
  description: "Clean bedroom, hall, wash dishes, wash the clothes.\nCook dinner.",
  duration: 7200, // seconds
  status: "suspense",
  date: new Date(new Date().valueOf() + DAY)
    .setHours(12, 0, 0, 0), // Tomorrow 12:00
  created: new Date(new Date().valueOf() - DAY)
    .setHours(20, 15, 0, 0), // Yesterday 20:15
  updated: new Date(new Date().valueOf() - DAY)
    .setHours(20, 15, 0, 0), // Yesterday 20:15
};

const suspenseCronTodo: ICronTodo = {
  id: 3,
  type: "CRON",
  title: "Morning work-out",
  description: "- 12x2 push ups\n- 12x2 crunch\n- 1mx2 plank\n- 12x2 Lunges\n- 12x2 squats",
  duration: 3600, // seconds
  status: "suspense",
  schedule: "",
  created: new Date(new Date().valueOf() - DAY)
    .setHours(18, 0, 0, 0), // Yesterday 18:00
  updated: new Date(new Date().valueOf() - DAY)
    .setHours(18, 0, 0, 0), // Yesterday 18:00
};

const TODO_LIST: ReadonlyArray<IMemoTodo | ITodo | ICronTodo> = [
  suspenseMemoTodo,
  suspenseTodo,
  suspenseCronTodo
];


const TodoContext = React.createContext(null);

export const useTodo = () => React.useContext(TodoContext);

export const TodoProvider = (props) => {
  const [todoList, setTodoList] = React.useState([...TODO_LIST]);

  const value = React.useMemo(
    () => [todoList, setTodoList],
    [todoList,]
  );

  return <TodoContext.Provider {...props} value={value}/>
};