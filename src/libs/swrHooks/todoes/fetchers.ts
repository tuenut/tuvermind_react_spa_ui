import axios from "axios";

import { deserializeTodo } from "./serializers";
import { TodoesListResponseType } from "./types";


export const todoesListFetcher = url => axios
  .get(url)
  .then((response: TodoesListResponseType) =>
    response.data.results.map(deserializeTodo)
  );

