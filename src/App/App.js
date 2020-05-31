import axios from "axios";

import React from 'react';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import {Container} from "react-bootstrap";

import {HOST} from "../constants";
import rootReducer from ".././Store/reducers";
import WeatherView from "./components/Weather/View";

const enchancers = [
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
];

const store = createStore(
  rootReducer,
  compose(...enchancers)
);

axios.defaults.baseURL = HOST;


class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Provider store={store}>

          <WeatherView/>

        </Provider>
      </Container>
    )
  }
}

export default App;
