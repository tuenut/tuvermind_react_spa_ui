import React from 'react';

import {IUseTodo, TodoContextType} from "./TodoContextTypes";
import {TodoReducer} from "./reducers";


/*
* TODO по идее, надо делать задачи с расписанием как шаблонные а из них спавнить
* новые мелкие объекты,
* когда текущий период закончился.
* */

const TodoContext = React.createContext<TodoContextType>(undefined!);

export const useTodo: IUseTodo = () => React.useContext(TodoContext);

export const TodoProvider = (props) => {
  const [todoList, setTodoList] = React.useReducer(
    TodoReducer,
    []
  );

  const value = React.useMemo(
    () => [todoList, setTodoList],
    [todoList,]
  );

  return <TodoContext.Provider {...props} value={value}/>
};