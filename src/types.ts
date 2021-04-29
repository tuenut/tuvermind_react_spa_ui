import {ApiProvider} from "./libs/Api/apiProvider";

import {TodoesApi} from "./API";


export interface IEffectiveApiObject extends ApiProvider {
  todoes: TodoesApi
}