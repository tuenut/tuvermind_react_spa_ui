import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {configurator} from "./libs/Api/index";
import {TodoesApi} from "./API/index";

import {HOST} from "./settings/remoteAPIHost";

import {App} from './components/App/App';
import {store} from "./Store";


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
