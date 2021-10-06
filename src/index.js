import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";

import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/responsiveWidth.css';
import "./assets/css/overrides.css";

import {App} from './components/App/App';
import {store} from "./Store";
import {enableApi} from "./__DEPRECATED__API";


enableApi();


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
