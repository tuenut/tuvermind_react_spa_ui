import {BaseApiEndpoint} from "./bases/endpointBases";


export interface ApiConfigurationObject<T = any> {
  [name: string]: T extends BaseApiEndpoint ? T : BaseApiEndpoint
}

