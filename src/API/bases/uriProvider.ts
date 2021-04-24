export class URI {
  protected url: string;

  constructor(url) {
    this.url = url;
  }

  retrieve(entityId: number | string, extraAction: string = ""): string {
    let url = entityId
      ? `${this.url}${entityId}/${extraAction}`
      : `${this.url}${entityId}${extraAction}`;

    url = url.endsWith("/") ? url : `${url}/`;

    return url;
  }

  list(options?: object): string {
    return `${this.url}?${this.parseOptions(options)}`;
  }

  create() {
    return this.retrieve("");
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