import {ApiProvider} from "./bases/apiProvider";
import {ApiConfigurationObject} from "./types";


class EndpointDoesNotExist {
  name = "Endpoint does not exist"
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

  constructor() {
    this.config = {};
  }

  getApi() {
    const api = new ApiProvider();

    const proxyHandler = {
      get: (target, name) => {
        if (!(name in target) && (name in this.config)) {
          Object.getPrototypeOf(api)[name] = new this.config[name](api.client);
        } else {
          throw new EndpointDoesNotExist();
        }

        return target[name];
      },
    };

    return new Proxy(api, proxyHandler);
  }

  configure(configObject: ApiConfigurationObject) {
    this.config = {...configObject};
  }
}

export const configurator = new ApiConfigurator();
export const makeApiGetter = () => configurator.getApi.bind(configurator);
