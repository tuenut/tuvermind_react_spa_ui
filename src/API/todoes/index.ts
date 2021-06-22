import {DateTime} from "luxon";

import {DataHandler} from "../../libs/Api/dataHandler";
import {Endpoint} from "../../libs/Api/endpoint";

import {TODOES_URL} from "../../settings/remoteAPI";

import {random} from "../../libs/common";

import {AxiosPromise, AxiosResponse} from "axios";
import {
  IHandleOnSuccessList,
  ITodoFromApi,
  ITodoReminderFromApi,
  ITodoReminder, ITodo, ITodoToApiCreate
} from "./types";


export class TodoesHandler extends DataHandler {
  todoParser = (todoObject: ITodoFromApi) => {
    const reminders = todoObject.reminders
      ? todoObject.reminders.map(
        (reminder: ITodoReminderFromApi): ITodoReminder => ({
          ...reminder,
          when: DateTime.fromISO(reminder.when)
        })
      )
      : [];
    const startDate = DateTime.fromISO(todoObject.start_date);
    const startTime = todoObject.start_time
      ? DateTime.fromISO(todoObject.start_time)
      : null;
    const created = DateTime.fromISO(todoObject.created);
    const updated = todoObject.updated
      ? DateTime.fromISO(todoObject.updated)
      : null;
    const completed = todoObject.completed
      ? DateTime.fromISO(todoObject.completed)
      : null;

    return ({
      ...todoObject,
      startDate,
      startTime,
      created,
      updated,
      completed,
      reminders,
    });
  };

  onSuccessList: IHandleOnSuccessList = (response) => {
    console.log("Custom handler called!");

    const customizedData = response.data.results.map(this.todoParser);
    console.log({customizedData});

    return {
      ...response,
      data: {
        ...response.data,
        results: customizedData
      }
    }
  };

  onCreateRequest = (data: ITodo): ITodoToApiCreate => {
    return ({
      ...data,
      start_date: data.startDate!.toISODate(),
      start_time: data.startTime!.toISOTime(),
      reminders: data.reminders
        ? data.reminders
          .map((reminder: ITodoReminder): ITodoReminderFromApi =>
            ({...reminder, when: reminder.when.toISO()})
          )
        : [],
    });
  };

  onSuccessCreate = (response: AxiosResponse<ITodoFromApi>): AxiosResponse<ITodo> => {
    const customizedData = this.todoParser(response.data);

    return ({...response, data: customizedData});
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

  // completeTask(id) {
  //   return new Promise((resolve, reject) => {
  //     const state = store.getState();
  //
  //     console.log({state});
  //
  //     const data = state.todoes.list.data[id];
  //
  //
  //     setTimeout(
  //       (value) => resolve({
  //         status: 200,
  //         data: {
  //           message: `Todo ${id} has been completed.`,
  //           data: {
  //             ...data,
  //             completed: new Date().valueOf(),
  //             status: 'done'
  //           } as ITodoFromApi,
  //         }
  //       }),
  //       random(700, 1500)
  //     )
  //   })
  //     .then(res => res) as AxiosPromise;
  // }
}