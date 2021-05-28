import {AxiosPromise} from "axios";

import {TODOES_URL} from "../settings/remoteAPI";
import {Endpoint} from "../libs/Api/endpoint";
import {random} from "../libs/common";

import {ITodoFromApi} from "../Store/Todoes/types";

import {store} from "../Store";


export class TodoesApi extends Endpoint {
  constructor(client) {
    super(client);

    this.setUrl(TODOES_URL);
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
          data: {message: `Todo ${id} has been deleted.`, id}
        }),
        random(700, 1500)
      )
    })
      .then(res => res) as AxiosPromise;
  }

  completeTask(id) {
    return new Promise((resolve, reject) => {
      const state = store.getState();

      console.log({state});

      const data = state.todoes.list.data[id];


      setTimeout(
        (value) => resolve({
          status: 200,
          data: {
            message: `Todo ${id} has been completed.`,
            data: {
              ...data,
              completed: new Date().valueOf(),
              status: 'done'
            } as ITodoFromApi,
          }
        }),
        random(700, 1500)
      )
    })
      .then(res => res) as AxiosPromise;
  }
}
