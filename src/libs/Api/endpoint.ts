import {AxiosInstance, AxiosPromise} from "axios";
import {DataHandler, Handler} from "./dataHandler";
import {URI} from "./uriProvider";


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

  protected constructor(client: AxiosInstance) {
    this.client = client;
    this.handlers = new DataHandler();

    this.setUrl("");
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
   * @returns {AxiosPromise}                   AxiosPromise without catch statement.
   * */
  retrieve(id: number | string, extraAction: string = ""): AxiosPromise {
    return this.client
      .get(this.url.retrieve(id, extraAction))
      .then(this.handlers.onSuccessRetrieve)
  }

  /**
   * @method  list
   * @param   {Object}        [options]  REST API otions.
   * @returns {AxiosPromise}             AxiosPromise without catch statement.
   * */
  list(options?): AxiosPromise {
    return this.client
      .get(this.url.list(options))
      .then(this.handlers.onSuccessList)
  }

  /**
   * @method  create
   * @param   {Object}       data  Data for create new object.
   * @returns {AxiosPromise}       AxiosPromise without catch statement.
   * */
  create(data: object): AxiosPromise {
    return this.client
      .post(this.url.create())
      .then(this.handlers.onSuccessCreate)
  }

  /**
   * @method  update
   * @param   {number | string}   id    Id of entity.
   * @param   {Object}            data  Data for update object.
   * @returns {AxiosPromise}            AxiosPromise without catch statement.
   * */
  update(id: number | string, data: object): AxiosPromise {
    return this.client
      .put(this.url.update(id), data)
      .then(this.handlers.onSuccessUpdate)
  }

  /**
   * @method delete
   * @param   {number | string}     id  Id of entity.
   * @returns {AxiosPromise}            AxiosPromise without catch statement.
   * */
  delete(id: number | string): AxiosPromise {
    return this.client
      .delete(this.url.delete(id))
      .then(this.handlers.onSuccessDelete)
  }

  /**
   * @method setHandler set up default on success handler for instance.
   * @param   {function}         handler   function which consumes data and returns processed data object.
   * @returns {Endpoint}            Returns this object.
   * */
  setHandler(handler: Handler) {
    this.handlers.defaultOnSuccess = handler;

    return this;
  }

  /**
   * @method setHandler set up default on fail handler for instance.
   * @param   {function}         handler   function which consumes error and returns processed error data object.
   * @returns {Endpoint}            Returns this object.
   * */
  setOnErrorHandler(handler) {
    this.handlers.defaultOnError = handler;

    return this;
  }
}