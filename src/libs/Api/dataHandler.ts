import {AxiosError, AxiosResponse} from "axios";


export interface IHandler {
  (response: AxiosResponse): any
}

export interface IHandler {
  (error: AxiosError | object): any
}

export class DataHandler {
  public onSuccessRetrieve;
  public onSuccessList;
  public onSuccessCreate;
  public onSuccessUpdate;
  public onSuccessDelete;

  constructor() {
    const proxyGetter = (target: DataHandler, name: string) => {
      if (name in target) {
        return target[name];
      } else {
        if (name.toLowerCase().includes("success")) {
          return this.defaultOnSuccess;

        } else if (name.toLowerCase().includes("failure")) {
          return this.defaultOnFailure;

        } else {
          // use default behavior

          return target[name];
        }
      }
    }

    return new Proxy(this, {get: proxyGetter});
  }

  defaultOnSuccess = (response: AxiosResponse): AxiosResponse => response;

  defaultOnFailure = (error: AxiosError | object): AxiosError | object => error;
}