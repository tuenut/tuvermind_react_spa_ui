import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./Store/reducers";

import axios from "axios";
import {HOST} from "./settings/remoteAPIHost";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {App} from './components/App/App';


axios.defaults.baseURL = HOST;

let enchancers = [
    applyMiddleware(thunk),
];

const _dev_tools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (_dev_tools) {
    enchancers = enchancers.concat(_dev_tools)
}

const store = createStore(
    rootReducer,
    compose(...enchancers)
);


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
