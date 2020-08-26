import axios from "axios";
import {GET_WEATHER_ERROR, GET_WEATHER_SUCCESS} from "./todayForecatActionsTypes";
import {WEATHER_URL} from "../../../settings/remoteAPI";
import {roundDate} from "../../../utils/roundDate";


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
  const dateFrom = roundDate(new Date());
  const dateTo = new Date(dateFrom);

  dateTo.setHours(dateFrom.getHours() + 12);

  const filterOptions = {
    timestamp__gte: dateFrom.toISOString(),
    timestamp__lte: dateTo.toISOString()
  };

  const opts = Object.entries(filterOptions).map((opt) => opt.join("=")).join("&");

  return dispatch => {
    axios
      .get(`${WEATHER_URL}?${opts}`)
      .then(res => dispatch(fetchingSuccess(res)))
      .catch(err => dispatch(fetchingError(err)));
  };
};
