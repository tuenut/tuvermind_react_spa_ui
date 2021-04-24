import axios, {AxiosInstance} from "axios";
import {HOST} from "../../settings/remoteAPIHost";
import {ApiConfigurationObject} from "../types";


export class ApiProviderBase{
  protected client;
  private __headers?: any;

  get headers(): object {
    return {...this.__headers};
  }

  set headers(headers: object) {
    this.__headers = headers;
  }
}


export class ApiProvider extends ApiProviderBase implements ApiConfigurationObject{
  public client: AxiosInstance;

  constructor() {
    super();

    this.client = axios.create({
      baseURL: HOST,
      withCredentials: true,
      headers: this.headers
    });
  }
}


