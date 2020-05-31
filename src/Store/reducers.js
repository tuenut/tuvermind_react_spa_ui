import {combineReducers} from "redux";

import timeTickReducer from "./Clock/reducers";
import weatherReducer from "./Weather/reducers";


export default combineReducers({
  time: timeTickReducer,
  weather: weatherReducer
});


