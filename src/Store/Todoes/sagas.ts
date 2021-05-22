import {takeEvery, call, put, select, SagaReturnType} from "redux-saga/effects";

import {getApi} from "../../libs/Api";

import {actions, todoesListSelector} from "./";
import {Api} from "../../API";
import {IBaseRequestListAction} from "../../libs/redux/types";


function* todoesListWorker(action: IBaseRequestListAction) {
  const {loading} = yield select(todoesListSelector);

  if (!loading) {
    yield put(actions.START_LOADING());

    try {
      const api = getApi() as Api;

      const response: SagaReturnType<typeof api.todoes.list> =
        yield call(() => api.todoes.list(action.options));

      yield put(actions.GET_LIST_ON_SUCCEESS(response));
    } catch (e) {
      console.exception(e);

      yield put(actions.GET_LIST_ON_FAILURE(e));
    }

    yield put(actions.STOP_LOADING());
  }
}

export function* todoesListWatcher() {
  yield takeEvery(actions.GET_LIST.type as string, todoesListWorker);
}