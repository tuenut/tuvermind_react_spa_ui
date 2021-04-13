import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {HOST} from "../settings/remoteAPIHost";
import {TodoesAPI} from "./todoes";
import {IUri} from "./types";


export class API {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: HOST,
    })
  }

  get todoes() {
    const dataHandlers = new DataHandler();

    return new TodoesAPI(
      this.client,
      dataHandlers.defaultSuccessHandler,
      dataHandlers.defaultErrorHandler
    );
  }
}

export class URI implements IUri {
  public url: string;

  constructor(url) {
    this.url = url;
  }

  retrieve(entityId, extraAction = "") {
    return `${this.url}${entityId}/${extraAction}`
  }

  list(options = {}) {
    return `${this.url}?${this.parseOptions(options)}`;
  }

  delete(entityId) {
    return `${this.url}${entityId}`;
  }

  parseOptions = (options = {}) =>
    Object.entries(options)
      .filter(([k, v]) => Boolean(v))
      .map((opt) => opt.join("="))
      .join("&");
}


export class DataHandler {
  get defaultSuccessHandler() {
    return (res: AxiosResponse) => res;
  }

  get defaultErrorHandler() {
    return (err: AxiosError) => err;
  }
}