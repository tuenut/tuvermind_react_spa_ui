import {AxiosError, AxiosInstance, AxiosResponse} from "axios";

export interface ISuccessHandler {
  (response: AxiosResponse): void
}

export interface IEerrorHandler {
  (error: AxiosError): void
}

export interface IGetRequest {
  (
    url: string,
    successHandler: ISuccessHandler,
    errorHandler?: IEerrorHandler
  ): void
}

export interface IPostRequest {
  <DataType>(
    url: string,
    data: DataType,
    successHandler: ISuccessHandler,
    errorHandler?: IEerrorHandler
  ): void
}

export interface IApi {
  retrieve: IGetRequest,
  list: IGetRequest,
  create: IPostRequest,
  update: IPostRequest,
  delete: IGetRequest
}

export interface IUri {
  retrieve(entitytId: number, extraAction?: string): string,
  list(page?: number, psize?: number, restOptions?: object): string,
  delete(entitytId: number): string
}