import { AxiosPromise, AxiosResponse } from "axios";

import { TODOES_URL } from "../settings/remoteAPI";
import { Endpoint } from "../libs/Api/endpoint";
import { random } from "../libs/common";

import { ITodo, ITodoFromApi, ITodoReminder, ITodoReminderFromApi } from "../Store/Todoes/types";

import { store } from "../Store";
import { DataHandler } from "../libs/Api/dataHandler";
import { DateTime } from "luxon/src/luxon";
import { PaginatedApiResponse } from "../types";


interface IHandleOnSuccessList {
  (
    response: AxiosResponse<PaginatedApiResponse<ITodoFromApi>>
  ): AxiosResponse<PaginatedApiResponse<ITodo>>
}

export class TodoesHandler extends DataHandler {
  onSuccessList: IHandleOnSuccessList = (response) => {
    console.log("Custom handler called!");

    const parser = (todoObject: ITodoFromApi) => {
      const parsedReminders = todoObject.reminders.map(
        (reminder: ITodoReminderFromApi): ITodoReminder => ({
          ...reminder,
          when: DateTime.fromISO(reminder.when)
        })
      );

      return ({
        ...todoObject,
        start_date: DateTime.fromISO(todoObject.start_date),
        start_time: todoObject.start_time
          ? DateTime.fromISO(todoObject.start_time)
          : null,
        created: DateTime.fromISO(todoObject.created),
        updated: todoObject.updated
          ? DateTime.fromISO(todoObject.updated)
          : null,
        completed: todoObject.completed
          ? DateTime.fromISO(todoObject.completed)
          : null,
        reminders: parsedReminders,

      });
    };

    const customizedData = response.data.results.map(parser);
    console.log({customizedData});

    return {
      ...response,
      data: {
        ...response.data,
        results: customizedData
      }
    }
  }
}


export class TodoesApi extends Endpoint {
  constructor(client, url, handlers) {
    super(client, url, handlers);

    this.setUrl(TODOES_URL);
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
