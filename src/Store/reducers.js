import {combineReducers} from "redux";

import {weatherReducer} from "./Weather/reducers";


export default combineReducers({
  weather: weatherReducer
});


