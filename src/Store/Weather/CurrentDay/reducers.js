import {GET_WEATHER_STARTED, GET_WEATHER_SUCCESS, GET_WEATHER_ERROR} from "./actions";

const initialState = {
  loading: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_WEATHER_SUCCESS:
      let data = action.payload.results;
      data = data.sort((a, b) => {
        if (new Date(a.timestamp) < new Date(b.timestamp)) return -1;
        if (new Date(a.timestamp) > new Date(b.timestamp)) return 1;
        return 0;
      });

      return {
        ...state,
        loading: false,
        error: null,
        data: data
      };
    case GET_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};