import {BaseApiEndpoint} from "../bases/endpointBases";
import {TODOES_URL} from "../../settings/remoteAPI";
import {AxiosPromise} from "axios";
import {random} from "../../utils/common";
import {getTestTodoes} from "../../Store/Todoes/parts/testData";
import {useSelector} from "react-redux";
import {todoesListSelector} from "../../Store/Todoes/reducers";
import {TodoTypes} from "../../Store/Todoes/types";


export class TodoesApi extends BaseApiEndpoint {
  constructor(client) {
    super(client);

    this.setUrl(TODOES_URL);
  }

  list(options = {}) {
    return new Promise((resolve, reject) => {
        const data = getTestTodoes();

        setTimeout(
          (value) => resolve({data}),
          random(1000, 3000)
        );
      }
    )
      .then((res) => res) as AxiosPromise;
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(
        (value) => resolve({data: Object.assign({}, data)}),
        random(700, 1500)
      )
    })
      .then(res => res) as AxiosPromise;
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(
        (value) => resolve({
          status: 200,
          data: {message: `Todo ${id} has been deleted.`}
        }),
        random(700, 1500)
      )
    })
      .then(res => res) as AxiosPromise;
  }

  completeTask(id) {
    return new Promise((resolve, reject) => {
      const data = useSelector(todoesListSelector)[id];

      setTimeout(
        (value) => resolve({
          status: 200,
          data: {
            message: `Todo ${id} has been completed.`,
            data: {...data, completed: new Date().valueOf()} as TodoTypes
          }
        }),
        random(700, 1500)
      )
    })
      .then(res => res) as AxiosPromise;
  }
}
