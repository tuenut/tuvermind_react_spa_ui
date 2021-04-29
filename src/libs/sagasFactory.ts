import {call, put} from "redux-saga/effects";


export const makeApiSagaWorkerFactory = (startLoading, stopLoading) =>
  <Action = any>(apiCall, onSuccess, onFailure) =>
    function* (action: Action) {
      yield put(startLoading());

      try {
        const response = yield call(() => apiCall(action));
        yield put(onSuccess(response));
      } catch (e) {
        console.exception(e);

        yield put(onFailure(e));
      }

      yield put(stopLoading());
    };