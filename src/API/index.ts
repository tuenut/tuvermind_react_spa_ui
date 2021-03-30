import axios, {AxiosInstance} from 'axios';
import {IApi, IUri} from "./types";

import {HOST} from '../settings/remoteAPIHost';

import {random} from '../utils/common';


export class URI implements IUri {
  public url: string;

  constructor(url) {
    this.url = url;
  }

  retrieve(entityId, extraAction = "") {
    return `${this.url}${entityId}/${extraAction}`
  }

  list(page = undefined, psize = undefined, restOptions = {}) {
    let options = Object.entries({page, psize, ...restOptions})
      .filter(([k, v]) => Boolean(v))
      .map((opt) => opt.join("="))
      .join("&");

    return `${this.url}?${options}`;
  }

  delete(entityId) {
    return `${this.url}${entityId}`;
  }
}


export class API implements IApi {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: HOST,
    })
  }

  retrieve(url, successHandler, errorHandler) {
    this.client
      .get(url)
      .then(successHandler)
      .catch(this.getErrorHandler(errorHandler))
  }

  list(url, successHandler, errorHandler) {
    this.client
      .get(url)
      .then(successHandler)
      .catch(this.getErrorHandler(errorHandler))
  }

  create(url, data, successHandler, errorHandler) {
    this.client
      .post(url, data)
      .then(successHandler)
      .catch(this.getErrorHandler(errorHandler))
  }

  update(url, data, successHandler, errorHandler) {
    this.client
      .put(url, data)
      .then(successHandler)
      .catch(this.getErrorHandler(errorHandler))
  }

  delete(url, successHandler, errorHandler) {
    this.client
      .delete(url)
      .then(successHandler)
      .catch(this.getErrorHandler(errorHandler))
  }

  getErrorHandler(handler) {
    if (handler) {
      return handler;
    }
    else {
      return (error) => console.error({error});
    }
  }
}


export class ApiMock implements IApi {
  protected min: number;
  protected max: number;
  protected data: any;

  constructor(min, max, data?) {
    this.min = min;
    this.max = max;

    this.data = data;
  }

  mockRequest(url, successHandler, errorHandler?) {
    new Promise((resolve, reject) => {
        let data;
        if (this.data instanceof Function) {
          data = this.data();
        } else {
          data = this.data;
        }

        setTimeout(
          (value) => resolve(data),
          random(this.max, this.min)
        )
      }
    )
      .then(successHandler)
      .catch(this.getErrorHandler(errorHandler))
  }

  retrieve = this.mockRequest;
  list = this.mockRequest;
  create = (url, data, successHandler, errorHandler) =>
    this.mockRequest(url, successHandler, errorHandler);
  update = (url, data, successHandler, errorHandler) =>
    this.mockRequest(url, successHandler, errorHandler);
  delete = this.mockRequest;

  getErrorHandler(handler) {
    if (handler) {
      return handler;
    }
    else {
      return (error) => console.error({error});
    }
  }
}