import {IApi} from "./types";
import {AxiosError, AxiosInstance, AxiosPromise, AxiosResponse} from "axios";
import {TODOES_URL} from "../settings/remoteAPI";
import {URI} from "./apiProvider";


export class TodoesAPI implements IApi{
  protected client: AxiosInstance;
  protected defaultSuccessHandler: (res: AxiosResponse) => AxiosResponse;
  protected defaultErrorHandler: (err: AxiosError) => AxiosError;

  protected url: URI;

  constructor(client, successHandler, errorHandler) {
    this.client = client;
    this.defaultSuccessHandler = successHandler;
    this.defaultErrorHandler = errorHandler;

    this.url = new URI(TODOES_URL);
  }

  retrieve(id, successHandler?, errorHandler?) {
    successHandler = successHandler || this.defaultSuccessHandler;

    return this.client
      .get(this.url.retrieve(id))
      .then(successHandler);
  }

  list(options?, successHandler?, errorHandler?): AxiosPromise {
    return this.client
      .get(this.url.list(options))
      .then(successHandler|| this.defaultSuccessHandler);
  }

}
