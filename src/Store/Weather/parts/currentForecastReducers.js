import {
  GET_CURRENT_WEATHER_STARTED,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_ERROR
} from "./currentForecastActionsTypes";

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
  fetchingSuccess = (state, action) => ({
    ...state,
    loading: false,
    data: action.data
  }),
  fetchingError = (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })
;

export const currentForecastReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CURRENT_WEATHER_STARTED:
      return startFetching(state, action);

    case GET_CURRENT_WEATHER_SUCCESS:
      return fetchingSuccess(state, action);

    case GET_CURRENT_WEATHER_ERROR:
      return fetchingError(state, action);

    default:
      return state;
  }
};