import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {configurator} from "./libs/Api/index";
import {TodoesApi} from "./API/index";
import {updateTodoWatcher} from "./Store/Todoes/sagas";
import {getTodoesListWatcher} from "./Store/Todoes";
import {rootReducer} from "./Store/reducers";

import {HOST} from "./settings/remoteAPIHost";

import {App} from './components/App/App';


const sagaMiddleware = createSagaMiddleware();
let enchancers = [
  applyMiddleware(sagaMiddleware),
];

const _dev_tools = "__REDUX_DEVTOOLS_EXTENSION__" in window
  && window.__REDUX_DEVTOOLS_EXTENSION__();
if (_dev_tools) {
  enchancers = enchancers.concat(_dev_tools)
}

const store = createStore(
  rootReducer,
  compose(...enchancers)
);

sagaMiddleware.run(getTodoesListWatcher);
sagaMiddleware.run(updateTodoWatcher);


configurator.configure(HOST, {todoes: TodoesApi});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
