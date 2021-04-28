import {Endpoint} from "./endpoint";


export interface ApiConfigurationObject<T = any> {
  [name: string]: T extends Endpoint ? T : Endpoint
}

