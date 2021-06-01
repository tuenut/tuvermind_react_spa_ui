import {ApiProvider} from "./apiProvider";
import {ApiEndpointsConfig} from "./types";
import {AxiosRequestConfig} from "axios";
import { DataHandler } from "./dataHandler";


class EndpointDoesNotExist {
  name = "Endpoint {} does not exist!";
  object = null;

  constructor(endpointName, object) {
    this.name = this.name.replace('{}', endpointName);
    this.object = object;
  }
}


/**
 * @class ApiManagerSingleton
 * @property {ApiProvider} api - хранит объект репозитория Api, завернутый в Proxy.
 *    В прокси объекте используется перегруженный геттер.
 *    Прокси-геттер позволяет конструировать прототип объекта ApiProvider на лету.
 *     При обращении к несуществующему полю, будет произведена попытка найти
 *     одноименный эндпоинт в конфигурации эндпоинтов. Если такой эндпоинт найден,
 *     будет создан соответствующий экземпляр в поле прототипа.
 *
 * TODO: надо как следует проработать это все. Вероятно, можно сделать проще.
 * TODO: заюавно, что все равно вначале оно все равно обращается ко всем полям и все равно все создает.
 *
 * */
class ApiManagerSingleton {
  private host: string;
  private endpointsConfig: ApiEndpointsConfig;
  private commonHeaders: object;
  private axiosConfig: AxiosRequestConfig;
  private api!: ApiProvider;

  private static _instance: ApiManagerSingleton;

  private constructor() {
    this.host = "";
    this.endpointsConfig = {};
    this.commonHeaders = {};
    this.axiosConfig = {};
  }

  /**
   * @method getInstance
   * Может быть вызван без параметров.
   *
   * @param {string}                [host]           - baseUrl для axios конфига
   * @param {ApiEndpointsConfig}    [config]         - словарь с эндпоинтами
   * @param {object | Function}     [commonHeaders]  - заголовки, которые *в теории* буду использоваться при каждом запросе.
   *  Если в качестве заголовков передать функцию, то она будет вызвана каждый раз при обращении к полю заголовков
   *  и результат будет использован в качестве заголовков.
   *
   *  @param {AxiosRequestConfig}   [axiosConfig]
   * */
  public static getInstance(
    host?: string,
    config?: ApiEndpointsConfig,
    commonHeaders?: object | Function,
    axiosConfig?: AxiosRequestConfig
  ): ApiManagerSingleton {
    const hasArguments = (
      host !== undefined ||
      config !== undefined ||
      commonHeaders !== undefined ||
      axiosConfig !== undefined
    );

    if (!ApiManagerSingleton._instance) {
      ApiManagerSingleton._instance = new ApiManagerSingleton();
    }

    if (hasArguments) {
      ApiManagerSingleton._instance.configure(host, config, commonHeaders, axiosConfig);
    }

    return ApiManagerSingleton._instance;
  }

  public static getApi(): ApiProvider {
    return ApiManagerSingleton._instance.api;
  }

  configure(host?: string, config?: object, commonHeaders?: object | Function, axiosConfig?: AxiosRequestConfig) {
    if (!(host && config && commonHeaders))
      return;

    if (host !== undefined)
      this.host = host;
    if (config !== undefined)
      this.endpointsConfig = {...config};
    if (commonHeaders !== undefined)
      this.commonHeaders = commonHeaders;
    if (axiosConfig !== undefined) {
      this.axiosConfig = axiosConfig;
    }

    const apiProvider = new ApiProvider(this.host, this.commonHeaders, this.axiosConfig);

    const proxyGetter = (target: ApiProvider, name: string) => {
      if (!(name in target)) {
        if (name in this.endpointsConfig) {
          const handlers = this.endpointsConfig[name].handler
            ? new this.endpointsConfig[name].handler()
            : new DataHandler();

          Object.getPrototypeOf(target)[name] = new this.endpointsConfig[name].endpoint(
            this.api.client,
            this.endpointsConfig[name].url,
            handlers
          );
        } else {
          throw new EndpointDoesNotExist(name, {target, config: this.endpointsConfig});
        }
      }

      return target[name];
    };

    this.api = new Proxy(apiProvider, {get: proxyGetter});
  }
}


export const configureApi = (host, endpointsConfig?, headers?, axiosConfig?) =>
  ApiManagerSingleton.getInstance(host, endpointsConfig, headers, axiosConfig);

export const getApi = () => ApiManagerSingleton.getApi();