import axios from "axios";

export const GET_WEATHER_STARTED = "GET_WEATHER_STARTED";
export const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
export const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";

export const getTodayWeather = () => {
  return dispatch => {

    // let date = new Date();
    // let date_string = String(date.getDate()) + String(date.getMonth() + 1).padStart(2, "0") + String(date.getFullYear());

    axios
      .get('/api/weather/next15h/')
      .then(res => {
        dispatch(getCurrentWeatherSuccess(res.data))
      })
      .catch(err => {
        dispatch(getCurrentWeatherError(err.message))
      });
  };
};

const getCurrentWeatherSuccess = data => ({
  type: GET_WEATHER_SUCCESS,
  payload: data
});

const getCurrentWeatherError = error => ({
  type: GET_WEATHER_ERROR,
  payload: error
});