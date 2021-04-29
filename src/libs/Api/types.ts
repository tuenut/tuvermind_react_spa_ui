import {Endpoint} from "./endpoint";
import {AxiosPromise} from "axios";


export interface ApiConfigurationObject<T = any> {
  [name: string]: T extends Endpoint ? T : Endpoint
}

