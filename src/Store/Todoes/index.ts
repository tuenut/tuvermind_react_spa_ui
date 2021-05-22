import {apiListManagementFactory} from "../../libs/redux";
import {IState} from "../types";


export const [todoesReducer, actions] = apiListManagementFactory("todoes");

export const todoesListSelector = (state: IState) => state.todoes;



