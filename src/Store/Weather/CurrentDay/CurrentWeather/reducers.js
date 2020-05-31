import {GET_CURRENT_WEATHER_STARTED, GET_CURRENT_WEATHER_SUCCESS, GET_CURRENT_WEATHER_ERROR} from "./actions";

const initialState = {
  loading: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_WEATHER_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      };
    case GET_CURRENT_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};