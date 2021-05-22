import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";

import {rootReducer} from "./reducers";
import {todoesListWatcher} from "./Todoes/sagas";


const sagaMiddleware = createSagaMiddleware();


let enchancers = [
  applyMiddleware(sagaMiddleware),
];


if ("__REDUX_DEVTOOLS_EXTENSION__" in window)
  enchancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());


export const store = createStore(
  rootReducer,
  compose(...enchancers)
);


sagaMiddleware.run(todoesListWatcher);