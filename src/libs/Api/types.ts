import {Endpoint} from "./endpoint";



export interface ApiEndpointsConfig<T = any> {
  [name: string]: T extends Endpoint ? T : Endpoint
}

export type idType = number | string;
