import {ApiProvider} from "./apiProvider";
import {ApiConfigurationObject} from "./types";


class EndpointDoesNotExist {
  name = "Endpoint {} does not exist!";
  object = null;

  constructor(endpointName, object) {
    this.name = this.name.replace('{}', endpointName);
    this.object = object;
  }
}

/**
 * ApiConfigurator must be singleton.
 * Use `configure` method on start app with configuration object.
 *
 * `getApi` method configure api provider prototype on fly and add endpoints
 * from configuration object.
 *
 */
class ApiConfigurator {
  private config: ApiConfigurationObject;
  private host: string;

  constructor(host = "", config = {}) {
    this.config = {...config};
    this.host = host;
  }

  getApi() {
    const api = new ApiProvider(this.host);

    const proxyHandler = {
      get: (target, name) => {
        if (!(name in target)) {
          if (name in this.config) {
            Object.getPrototypeOf(api)[name] = new this.config[name](api.client);
          } else {
            throw new EndpointDoesNotExist(name, {target, config: this.config});
          }
        }

        return target[name];
      },
    };

    return new Proxy(api, proxyHandler);
  }
}

export const createApi = (host, config) => {
  const configurator = new ApiConfigurator(host, config);

  const useConfigurator = () => configurator;
  const useApi = () => configurator.getApi();

  return [useConfigurator, useApi];
};

