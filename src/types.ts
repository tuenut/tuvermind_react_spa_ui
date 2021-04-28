import {ApiProvider} from "./libs/Api/apiProvider";
import {Endpoint} from "./libs/Api/endpoint";

export interface IEffectiveApiObject extends ApiProvider {
  todoes: Endpoint
}