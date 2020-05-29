
import {EXAMPLE_ACTION} from "./actions";


export const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return {
        ...state,
        example_value: action.payload
      };

    default:
      return state
  }
};