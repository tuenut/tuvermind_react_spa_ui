import {TIME_TICK_ACTION} from "./actions";


function getCurrentDateTime() {
  let date = new Date();
  let current_day = `${date.toLocaleDateString("ru", {weekday: 'long'})}`;
  let current_date = `${date.toLocaleDateString()}`;
  let current_time = `${date.toLocaleTimeString()}`;

  return {
    current_date: `${current_day} ${current_date}`,
    current_time: current_time,
  }
}


let default_state = getCurrentDateTime();

export default (state = default_state, action) => {
  switch (action.type) {
    case TIME_TICK_ACTION:
      return {
        ...state,
        ...getCurrentDateTime()
      };

    default:
      return state;
  }
};