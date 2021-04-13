import {call, put, takeEvery, select, SagaReturnType} from "redux-saga/effects";
import {
  getTodoesListOnFailure,
  getTodoesListOnSuccess,
  getTodoesListStartLoading,
  getTodoesListStopLoading,
  TODOES_GET_LIST_ACTION
} from "./actions";
import {IGetTodoesList} from "./types";
import {API, ApiMock} from "../../API";
import {getTestTodoes} from "../../components/TODO/Context/testData";


export function* getTodoesListWorker(action: IGetTodoesList) {
  yield put(getTodoesListStartLoading());

  const api = new ApiMock(1000, 5000, getTestTodoes);

  try {
    // const api = new API();
    // const response: SagaReturnType<typeof api.todoes.list> =
    //   yield call(() => api.todoes.list(action.options));
    //
    const response = yield call(() => api.list(action.options));

    yield put(getTodoesListOnSuccess(response));

  } catch (e) {
    console.log({e});

    yield put(getTodoesListOnFailure(e));
  }

  yield put(getTodoesListStopLoading());
}

export function* getTodoesListWatcher() {
  yield takeEvery(TODOES_GET_LIST_ACTION, getTodoesListWorker);
}

