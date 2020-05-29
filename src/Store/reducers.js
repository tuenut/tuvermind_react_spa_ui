import {combineReducers} from "redux";

import {exampleReducer} from "./example/reducers"
import {timeTickReducer} from "./ClockFrame/reducers";

export default combineReducers({
  example: exampleReducer,
  time: timeTickReducer
});


