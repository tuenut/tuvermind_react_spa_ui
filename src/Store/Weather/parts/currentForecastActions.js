import axios from "axios";
import {GET_CURRENT_WEATHER_ERROR, GET_CURRENT_WEATHER_SUCCESS} from "./currentForecastActionsTypes";
import {WEATHER_URL} from "../../../settings/remoteAPI";
import {roundDate} from "../../../utils/rounDate";


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
  const nearestDate = roundDate(new Date());

  return dispatch => {
    axios
      .get(`${WEATHER_URL}?timestamp=${nearestDate.toISOString()}`)
      .then(res => dispatch(fetchingSuccess(res)))
      .catch(err => dispatch(fetchingError(err)));
  };
};
