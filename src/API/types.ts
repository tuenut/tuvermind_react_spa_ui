import {AxiosError, AxiosInstance, AxiosResponse, AxiosPromise} from "axios";

export type SuccessHandler = (response: AxiosResponse) => any;
export type ErrorHandler = (error: AxiosError) => any;

export type GetRequest = (
  id: number,
  successHandler?: SuccessHandler,
  errorHandler?: ErrorHandler
) => AxiosPromise;


export type ListRequest = (
  options?: {
    [key: string]: undefined | null | boolean | number | string
  },
  successHandler?: SuccessHandler,
  errorHandler?: ErrorHandler
) => AxiosPromise;


export type PostRequest = <DataType>(
  url: string,
  data: DataType,
  successHandler?: SuccessHandler,
  errorHandler?: ErrorHandler
) => AxiosPromise;


export interface IApi {
  retrieve?: GetRequest,
  list?: ListRequest,
  create?: PostRequest,
  update?: PostRequest,
  delete?: GetRequest
}

export interface IUri {
  retrieve(entitytId: number, extraAction?: string): string,

  list(page?: number, psize?: number, restOptions?: object): string,

  delete(entitytId: number): string
}