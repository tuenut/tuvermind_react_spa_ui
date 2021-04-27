import {call, put, SagaReturnType, takeEvery} from "redux-saga/effects";
import {
  getTodoesListOnFailure,
  getTodoesListOnSuccess,
  getTodoesListStartLoading,
  getTodoesListStopLoading,
  TODOES_GET_LIST_ACTION,
  TODOES_UPDATE_ACTION, updateTodoOnFailure, updateTodoOnSuccess
} from "./actions";
import {IGetTodoesList, IUpdateTodo} from "./types";
import {getApi} from "../../settings/remoteAPI";


export function* getTodoesListWorker(action: IGetTodoesList) {
  yield put(getTodoesListStartLoading());

  try {
    const Api = getApi();
    const response = yield call(() => Api.todoes.list(action.options));

    yield put(getTodoesListOnSuccess(response));

  } catch (e) {
    console.exception(e);

    yield put(getTodoesListOnFailure(e));
  }

  yield put(getTodoesListStopLoading());
}

export function* getTodoesListWatcher() {
  yield takeEvery(TODOES_GET_LIST_ACTION, getTodoesListWorker);
}

export function* updateTodoWorker(action: IUpdateTodo) {
  yield put(getTodoesListStartLoading());

  try{
    const Api = getApi();
    const response = yield call(
      () => Api.todoes.update(action.id, action.data)
    );

    yield put(updateTodoOnSuccess(response));

  } catch (e) {
    console.exception(e);

    yield put(updateTodoOnFailure(e));
  }

  yield put(getTodoesListStopLoading());
}

export function* updateTodoWatcher() {
  yield takeEvery(TODOES_UPDATE_ACTION, updateTodoWorker);
}

