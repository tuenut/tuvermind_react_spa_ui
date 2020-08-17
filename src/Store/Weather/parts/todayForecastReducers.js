import {
  GET_WEATHER_STARTED,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_ERROR
} from "./todayForecatActionsTypes";

const defaultState = {
  loading: false,
  data: [],
  error: null
};

const
  startFetching = (state, action) => ({
    ...state,
    loading: true
  }),
  fetchingSuccess = (state, action) => {
    let data = action.data.results;
    data = data.sort((a, b) => {
      if (new Date(a.timestamp) < new Date(b.timestamp))
        return -1;
      if (new Date(a.timestamp) > new Date(b.timestamp))
        return 1;

      return 0;
    });

    return {
      ...state,
      loading: false,
      data: data
    }
  },
  fetchingError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })
;

export const todayForecastReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_WEATHER_STARTED:
      return startFetching(state, action);

    case GET_WEATHER_SUCCESS:
      return fetchingSuccess(state, action);

    case GET_WEATHER_ERROR:
      return fetchingError(state, action);

    default:
      return state;
  }
};