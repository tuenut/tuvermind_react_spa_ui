import { Endpoint } from "./endpoint";
import { DataHandler } from "./dataHandler";


export interface ApiEndpointsConfig<T = any, H = any> {
  [name: string]: {
    endpoint: T extends Endpoint ? T : Endpoint,
    url?: string,
    handler?: H extends DataHandler ? H : DataHandler,
  }
}

export interface ApiEndpointsProvider<T = any> {
  [name: string]: T extends Endpoint ? T : Endpoint,
}

export type idType = number | string;
