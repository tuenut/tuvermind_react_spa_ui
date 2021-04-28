import axios, {AxiosInstance} from "axios";

import {ApiConfigurationObject} from "./types";


export class ApiProviderBase{
  protected client;
  protected host: string;
  private __headers?: any;

  constructor(host: string){
    this.host = host;
  }

  get headers(): object {
    return {...this.__headers};
  }

  set headers(headers: object) {
    this.__headers = headers;
  }
}


export class ApiProvider extends ApiProviderBase implements ApiConfigurationObject{
  public client: AxiosInstance;

  constructor(host: string) {
    super(host);

    this.client = axios.create({
      baseURL: this.host,
      withCredentials: true,
      headers: this.headers
    });
  }
}


