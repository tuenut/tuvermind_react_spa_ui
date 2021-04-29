import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";

import {rootReducer} from "./reducers";
import {
  completeTodoWatcher,
  getTodoesListWatcher,
  updateTodoWatcher,
  deleteTodoWatcher
} from "./Todoes";


const sagaMiddleware = createSagaMiddleware();


let enchancers = [
  applyMiddleware(sagaMiddleware),
];


const _dev_tools = "__REDUX_DEVTOOLS_EXTENSION__" in window
  && window.__REDUX_DEVTOOLS_EXTENSION__();
if (_dev_tools) {
  enchancers = enchancers.concat(_dev_tools)
}


export const store = createStore(
  rootReducer,
  compose(...enchancers)
);


sagaMiddleware.run(getTodoesListWatcher);
sagaMiddleware.run(updateTodoWatcher);
sagaMiddleware.run(completeTodoWatcher);
sagaMiddleware.run(deleteTodoWatcher);

