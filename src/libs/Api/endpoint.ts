import {AxiosInstance, AxiosPromise} from "axios";
import {DataHandler, IHandler} from "./dataHandler";
import {URI} from "./uriProvider";
import {idType} from "./types";


/** Базовый абстрактный класс для апи-эндпоинтов.
 * Основные методы обращения к апи уже реализованы с базовым поведение.
 *
 * Для определения специфических хэндлеров для каждого метода, предполагается
 * явный вызов сеттера для конкретного хэндлера у объекта this.handlers. Можно
 * делать это в конструкторе наследника BaseApiEndpoint или в клиентском коде.
 * Как вариант можно делать отдельный класс, унаследованный от DataHandler и
 * использовать его.
 *
 * В общем случае можно наследоваться так:
 * @example
 *  class Endpoint extends BaseApiEndpoint {
 *    constructor(client) {
 *      super(ENDPOINT_BASE_URL)
 *
 *      this.setUrl(currentEndpointUrl);
 *    }
 *  }
 * */
export abstract class Endpoint {
  protected client: AxiosInstance;
  protected handlers: DataHandler;
  protected __url!: URI;

  /**
   * TODO надо допилить в конфигураторе, чтобы урл и заголовки получались из конфига и с ними класс инициалицизовался.
   * Или типа того.
   * */
  protected constructor(client: AxiosInstance, url: string | URI, handlersKlass: DataHandler) {
    this.client = client;
    this.handlers = handlersKlass;

    this.setUrl(url || "");
  }

  get url(): URI {
    return this.__url;
  }

  protected setUrl(value: string | URI) {
    this.__url = typeof value === "string" ? new URI(value) : value;
  }

  /**
   * @method retrieve
   * @param   {number | string} id             Id of entity.
   * @param   {string}          [extraAction]  Name of extra action for endpoint.
   * @param   {Object}          [options]      REST API otions.
   * @returns {AxiosPromise}                   AxiosPromise without catch statement.
   * */
  retrieve(id: idType, extraAction: string = "", options?: object): AxiosPromise {
    return this.client
      .get(this.url.retrieve(id, extraAction, options))
      .then(this.handlers.onSuccessRetrieve)
  }

  /**
   * @method  list
   * @param   {Object}        [options]  REST API otions.
   * @param   {string}        [extraAction]
   * @returns {AxiosPromise}             AxiosPromise without catch statement.
   * */
  list(options?: object, extraAction?: string): AxiosPromise {
    return this.client
      .get(this.url.list(options, extraAction))
      .then(this.handlers.onSuccessList)
  }

  /**
   * @method  create
   * @param   {Object}       [data]  Data for create new object.
   * @returns {AxiosPromise}         AxiosPromise without catch statement.
   * */
  create(data: object) {
    if (this.handlers.onCreateRequest) {
      data = this.handlers.onCreateRequest(data);
    }

    return this.client
      .post(this.url.create(), data)
      .then(this.handlers.onSuccessCreate);
  }

  /**
   * @method  update
   * @param   {number | string}   [id]    Id of entity.
   * @param   {Object}            [data]  Data for update object.
   * @returns {AxiosPromise}              AxiosPromise without catch statement.
   * */
  update(id: idType, data: object): AxiosPromise {
    return this.client
      .put(this.url.update(id), data)
      .then(this.handlers.onSuccessUpdate)
  }

  /**
   * @method delete
   * @param   {number | string}     [id]  Id of entity.
   * @returns {AxiosPromise}              AxiosPromise without catch statement.
   * */
  delete(id: idType): AxiosPromise {
    return this.client
      .delete(this.url.delete(id))
      .then(this.handlers.onSuccessDelete)
  }
}