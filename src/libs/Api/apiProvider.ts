import axios, {AxiosInstance} from "axios";

import {ApiConfigurationObject} from "./types";


export class ApiProviderBase{
  protected client;
  protected host: string;
  private __headers?: any;

  constructor(host: string){
    console.log({host});
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
    console.log({host});

    super(host);

    console.log({host, self: this});

    this.client = axios.create({
      baseURL: this.host,
      withCredentials: false, // TODO установил в `false` чтобы CORS работал на время отладки.
      headers: this.headers
    });
  }
}


