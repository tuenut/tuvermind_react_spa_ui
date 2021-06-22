import {idType} from "./types";


export class URI {
  protected url: string;

  constructor(url: string) {
    this.url = url.endsWith("/") ? url : url + "/";
  }

  retrieve(entityId: idType, extraAction?: string): string {
    return extraAction
      ? `${this.url}${entityId}/${extraAction}/`
      : `${this.url}${entityId}/`;
  }

  list(options?: object, extraAction?: string): string {
    const parsedOptions = this.parseOptions(options);

    return extraAction
      ? `${this.url}${extraAction}/?${parsedOptions}`
      : `${this.url}?${parsedOptions}`;
  }

  create() {
    return this.url;
  }

  update(id) {
    return this.retrieve(id);
  }

  delete(id) {
    return this.retrieve(id);
  }

  parseOptions = (options: object = {}): string =>
    Object.entries(options)
      .filter(([k, v]) => Boolean(v))
      .map((opt) => opt.join("="))
      .join("&");
}