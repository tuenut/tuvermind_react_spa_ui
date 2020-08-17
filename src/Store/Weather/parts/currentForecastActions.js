import axios from "axios";
import {GET_CURRENT_WEATHER_ERROR, GET_CURRENT_WEATHER_SUCCESS} from "./currentForecastActionsTypes";


const fetchingSuccess = response => ({
  response,
  type: GET_CURRENT_WEATHER_SUCCESS,
  data: response.data
});

const fetchingError = response => ({
  response,
  type: GET_CURRENT_WEATHER_ERROR,
  error: response.message
});

export const requestCurrentForecast = () => {
  return dispatch => {
    axios
      .get('/api/weather/current')
      .then(res => dispatch(fetchingSuccess(res)))
      .catch(err => dispatch(fetchingError(err)));
  };
};
