import {combineReducers} from "redux";

import {currentForecastReducer} from "./parts/currentForecastReducers";
import {todayForecastReducer} from "./parts/todayForecastReducers";

export const weatherReducer = combineReducers({
  current: currentForecastReducer,
  today: todayForecastReducer
});