import {TIME_TICK_ACTION} from "./actions";


export default (state = {}, action) => {
  switch (action.type) {
    case TIME_TICK_ACTION:
      return {
        ...state,
        current_date: `${action.payload.toLocaleDateString("ru", {weekday: 'long'})} ${action.payload.toLocaleDateString()}`,
        current_time: `${action.payload.toLocaleTimeString()}`,
      };

    default:
      return state;
  }
};