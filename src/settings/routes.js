import {
  HOME_ROUTE,
  TODO_LIST_ROUTE
} from "./routesPaths";

import {Home} from "../components/pages";
import {TODOPage} from "../components/TODO";


export const routes = [
  {
    path: HOME_ROUTE,
    exact: true,
    name: "Home",
    component: Home
  },
  {
    path: TODO_LIST_ROUTE,
    exact: true,
    name: "Todo List",
    component: TODOPage
  },
];