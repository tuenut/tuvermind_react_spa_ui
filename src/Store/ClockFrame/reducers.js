import {TIME_TICK_ACTION} from "./actions";


export const timeTickReducer = (state = {}, action) => {
  switch (action.type) {
    case TIME_TICK_ACTION:
      return {
        ...state,
        current_date: action.payload.toLocaleDateString(),
        current_time: action.payload.toLocaleTimeString(),
      };

    default:
      return state
  }
};