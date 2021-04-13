import {random} from "../utils/common";

export class ApiMock {
  protected min: number;
  protected max: number;
  protected data: any;

  constructor(min, max, data?) {
    this.min = min;
    this.max = max;

    this.data = data;
  }

  mockRequest(options, successHandler = (res) => res, errorHandler?) {
    return new Promise((resolve, reject) => {
        let data;
        if (this.data instanceof Function) {
          data = this.data();
        } else {
          data = this.data;
        }

        setTimeout(
          (value) => resolve({data}),
          random(this.max, this.min)
        );
      }
    )
      .then(successHandler)
      .catch(this.getErrorHandler(errorHandler))
  }

  retrieve = this.mockRequest;

  list = this.mockRequest;

  create = (options, data, successHandler, errorHandler) => this.mockRequest(options, successHandler, errorHandler);

  update = (options, data, successHandler, errorHandler) => this.mockRequest(options, successHandler, errorHandler);

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