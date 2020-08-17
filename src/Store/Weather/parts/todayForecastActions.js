import axios from "axios";
import {GET_WEATHER_ERROR, GET_WEATHER_SUCCESS} from "./todayForecatActionsTypes";


const fetchingSuccess = response => ({
  response,
  type: GET_WEATHER_SUCCESS,
  data: response.data
});

const fetchingError = response => ({
  response,
  type: GET_WEATHER_ERROR,
  error: response.message
});

export const requestTodayForecast = () => {
  return dispatch => {
    axios
      .get('/api/weather/next15h/')
      .then(res => dispatch(fetchingSuccess(res)))
      .catch(err => dispatch(fetchingError(err)));
  };
};
