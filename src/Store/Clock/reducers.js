import {TIME_TICK_ACTION} from "./actions";


const getCurrentDateTime = (state, action) => {
  let date = new Date();
  let current_day = `${date.toLocaleDateString("ru", {weekday: 'long'})}`;
  let current_date = `${date.toLocaleDateString()}`;
  let current_time = `${date.toLocaleTimeString()}`;

  return {
    ...state,
    current_date: `${current_day} ${current_date}`,
    current_time: current_time,
  }
};


const default_state = getCurrentDateTime();

export const timeTickReducer = (state = default_state, action) => {
  switch (action.type) {
    case TIME_TICK_ACTION:
      return getCurrentDateTime(state, action);

    default:
      return state;
  }
};