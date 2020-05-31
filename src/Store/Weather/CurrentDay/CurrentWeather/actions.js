import axios from "axios";

export const GET_CURRENT_WEATHER_STARTED = "GET_CURRENT_WEATHER_STARTED";
export const GET_CURRENT_WEATHER_SUCCESS = "GET_CURRENT_WEATHER_SUCCESS";
export const GET_CURRENT_WEATHER_ERROR = "GET_CURRENT_WEATHER_ERROR";

export const getCurrentWeather = () => {
  return dispatch => {
    axios
      .get('/api/weather/current')
      .then(res => {
        dispatch(getCurrentWeatherSuccess(res.data))
      })
      .catch(err => {
        dispatch(getCurrentWeatherError(err.message))
      });
  };
};

const getCurrentWeatherSuccess = data => ({
  type: GET_CURRENT_WEATHER_SUCCESS,
  payload: data
});

const getCurrentWeatherError = error => ({
  type: GET_CURRENT_WEATHER_ERROR,
  payload: error
});