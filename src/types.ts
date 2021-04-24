import {ApiProvider} from "./API/bases/apiProvider";
import {BaseApiEndpoint} from "./API/bases/endpointBases";

export interface IEffectiveApiObject extends ApiProvider {
  todoes: BaseApiEndpoint
}