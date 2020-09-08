import {
  HOME_ROUTE
} from "./routesPaths";

import {Home} from "../components/pages";


export const routes = [
  {
    path: HOME_ROUTE,
    exact: true,
    name: "Home",
    component: Home
  },
];