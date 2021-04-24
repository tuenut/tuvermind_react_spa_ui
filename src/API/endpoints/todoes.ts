import {BaseApiEndpoint} from "../bases/endpointBases";
import {TODOES_URL} from "../../settings/remoteAPI";
import {AxiosPromise} from "axios";
import {random} from "../../utils/common";
import {getTestTodoes} from "../../Store/Todoes/testData";


export class TodoesApi extends BaseApiEndpoint {
  constructor(client) {
    super(client);

    this.setUrl(TODOES_URL);
  }

  list(options={}) {
    return new Promise((resolve, reject) => {
        const  data = getTestTodoes();

        setTimeout(
          (value) => resolve({data}),
          random(1000, 3000)
        );
      }
    )
      .then((res) => res) as AxiosPromise;
  }
}
