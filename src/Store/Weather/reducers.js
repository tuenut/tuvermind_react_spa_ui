import {combineReducers} from "redux";
import getCurrentWeatherReducer from "./CurrentDay/CurrentWeather/reducers";
import getCurrentDayReducer from "./CurrentDay/reducers";

export default combineReducers({
  current: getCurrentWeatherReducer,
  today: getCurrentDayReducer
});