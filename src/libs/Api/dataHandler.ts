import {AxiosError, AxiosResponse} from "axios";


export interface IHandler {
  (response: AxiosResponse): any
}

export interface IHandler {
  (error: AxiosError | object): any
}

export class DataHandler {
  protected _onSuccessRetrieve;
  protected _onSuccessList;
  protected _onSuccessCreate;
  protected _onSuccessUpdate;
  protected _onSuccessDelete;

  defaultOnSuccess = (response: AxiosResponse): AxiosResponse => response;

  defaultOnError = (error: AxiosError | object): AxiosError | object => error;

  get onSuccessRetrieve() {
    return this._onSuccessRetrieve || this.defaultOnSuccess;
  }

  get onSuccessList() {
    return this._onSuccessList || this.defaultOnSuccess;
  }

  get onSuccessCreate() {
    return this._onSuccessCreate || this.defaultOnSuccess;
  }

  get onSuccessUpdate() {
    return this._onSuccessUpdate || this.defaultOnSuccess;
  }

  get onSuccessDelete() {
    return this._onSuccessDelete || this.defaultOnSuccess;
  }

  set OnSuccessRetrieve(handler: IHandler) {
    this._onSuccessRetrieve = handler;
  }

  set OnSuccessList(handler: IHandler) {
    this._onSuccessList = handler;
  }

  set OnSuccessCreate(handler: IHandler) {
    this._onSuccessCreate = handler;
  }

  set OnSuccessUpdate(handler: IHandler) {
    this._onSuccessUpdate = handler;
  }

  set OnSuccessDelete(handler: IHandler) {
    this._onSuccessDelete = handler;
  }
}