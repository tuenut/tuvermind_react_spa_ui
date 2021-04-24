import {call, put, takeEvery, select, SagaReturnType} from "redux-saga/effects";
import {
  getTodoesListOnFailure,
  getTodoesListOnSuccess,
  getTodoesListStartLoading,
  getTodoesListStopLoading,
  TODOES_GET_LIST_ACTION
} from "./actions";
import {IGetTodoesList} from "./types";
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

