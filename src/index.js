import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";

import {rootReducer} from "./Store/reducers";
import {getTodoesListWatcher} from "./Store/Todoes";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {App} from './components/App/App';
import {configurator} from "./API";
import {TodoesApi} from "./API/endpoints";


const sagaMiddleware = createSagaMiddleware();
let enchancers = [
    applyMiddleware(sagaMiddleware),
];

const _dev_tools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (_dev_tools) {
    enchancers = enchancers.concat(_dev_tools)
}

const store = createStore(
    rootReducer,
    compose(...enchancers)
);

sagaMiddleware.run(getTodoesListWatcher);


configurator.configure({todoes: TodoesApi});


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
