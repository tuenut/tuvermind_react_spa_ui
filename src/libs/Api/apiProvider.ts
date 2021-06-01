import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

import { ApiEndpointsProvider } from "./types";


export class BaseApiProvider {
  protected host;
  private __headers?: object | Function;

  constructor(host: string, headers: object | Function) {
    this.host = host;
    this.headers = headers;
  }

  get headers(): object | Function {
    return (this.__headers instanceof Function) ? this.__headers() : {...this.__headers};
  }

  set headers(headers: object | Function) {
    this.__headers = (headers instanceof Function) ? headers : {...headers};
  }
}

export class ApiProvider extends BaseApiProvider implements ApiEndpointsProvider {
  public client: AxiosInstance;

  /**
   * @constructor
   * @param {string} [host]
   * @param {object} [headers] Если передан `axiosConfig` и там есть заголовки,
   *  то этот параметр имеет приоритет и перезапишет заголовки из конфига.
   *
   * @param {AxiosRequestConfig} [axiosConfig] Конфиг для axios для более
   *  полной настройки клиента.
   * */
  constructor(host: string, headers: object = {}, axiosConfig: AxiosRequestConfig = {}) {
    super(host, headers);

    this.client = axios.create({
      baseURL: this.host,
      ...axiosConfig,
      headers: this.headers,
    })
  }
}