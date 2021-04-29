import {takeEvery} from "redux-saga/effects";

import {getApi} from "../../settings/remoteAPI";
import {makeApiSagaWorkerFactory} from "../../libs/sagasFactory";

import {
  ICompleteTodoAction,
  ITodoesGetListAction,
  IUpdateTodoAction,
  TODOES_COMPLETE_TASK_ACTION,
  TODOES_UPDATE_ACTION,
  TODOES_GET_LIST_ACTION, IDeleteTodoAction, TODOES_DELETE_ACTION
} from "./actions/types";
import {
  getTodoesListOnFailure,
  getTodoesListOnSuccess,
  todoesStartLoading,
  todoesStopLoading,
  updateTodoOnFailure,
  updateTodoOnSuccess,
  completeTodoOnFailure,
  completeTodoOnSuccess,
} from "./actions/";
import {deleteTodoOnFailure, deleteTodoOnSuccess} from "./actions/actionCreators";


const Api = getApi();
const apiSagaFactory = makeApiSagaWorkerFactory(todoesStartLoading, todoesStopLoading);


export const getTodoesListWorker = apiSagaFactory<ITodoesGetListAction>(
  (action) => Api.todoes.list(action.options),
  getTodoesListOnSuccess, getTodoesListOnFailure
);

export function* getTodoesListWatcher() {
  yield takeEvery(TODOES_GET_LIST_ACTION, getTodoesListWorker);
}


export const updateTodoWorker = apiSagaFactory<IUpdateTodoAction>(
  (action) => Api.todoes.update(action.id, action.data),
  updateTodoOnSuccess, updateTodoOnFailure
);

export function* updateTodoWatcher() {
  yield takeEvery(TODOES_UPDATE_ACTION, updateTodoWorker);
}


export const completeTodoWorker = apiSagaFactory<ICompleteTodoAction>(
  (action) => Api.todoes.completeTask(action.id),
  completeTodoOnSuccess, completeTodoOnFailure
);

export function* completeTodoWatcher() {
  yield takeEvery(TODOES_COMPLETE_TASK_ACTION, completeTodoWorker);
}


export const deleteTodoWorker = apiSagaFactory<IDeleteTodoAction>(
  (action) => Api.todoes.delete(action.id),
  deleteTodoOnSuccess, deleteTodoOnFailure
);

export function* deleteTodoWatcher() {
  yield takeEvery(TODOES_DELETE_ACTION, deleteTodoWorker);
}