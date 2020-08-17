import axios from "axios";

export const GET_WEATHER_STARTED = "GET_WEATHER_STARTED";
export const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
export const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";

export const getTodayWeather = () => {
  return dispatch => {

    // let date = new Date();
    // let day = date.getDate().toString().padStart(2, '0');
    // let month = (date.getMonth()+1).toString().padStart(2, '0');
    // let year = date.getFullYear();
    // let date_string = `${day}${month}${year}`;

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