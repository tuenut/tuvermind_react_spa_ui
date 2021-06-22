import {takeEvery, call, put, select, SagaReturnType} from "redux-saga/effects";

import {getApi} from "../../libs/Api";

import {
  actions,
  TODOES_CREATE_REQUEST_ACTION, TODOES_UPDATE_REQUEST_ACTION, todoesCreateOnFailureAction,
  todoesCreateOnSuccessAction,
  todoesListSelector, todoesUpdateOnFailureAction, todoesUpdateOnSuccessAction,
} from "./";

import {Api} from "../../API";
import {
  IBaseApiCreateRequestAction,
  IBaseApiUpdateRequestAction,
  IBaseRequestListAction
} from "../../libs/redux/types";


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

function* todoesCreateWorker(action: IBaseApiCreateRequestAction) {
  try{
    const api = getApi() as Api;

    const response: SagaReturnType<typeof api.todoes.create> =
      yield call(() => api.todoes.create(action.data));

    yield put(todoesCreateOnSuccessAction(response));

  } catch (e) {
    console.exception(e);

    yield put(todoesCreateOnFailureAction(e));
  }
}

function* todoesUpdateWorker(action: IBaseApiUpdateRequestAction) {
  try{
    const api = getApi() as Api;

    const response: SagaReturnType<typeof api.todoes.create> =
      yield call(() => api.todoes.update(action.id, action.data));

    yield put(todoesUpdateOnSuccessAction(response));

  } catch (e) {
    console.exception(e);

    yield put(todoesUpdateOnFailureAction(e));
  }
}

export function* todoesListWatcher() {
  yield takeEvery(actions.GET_LIST.type as string, todoesListWorker);

  yield takeEvery(TODOES_CREATE_REQUEST_ACTION, todoesCreateWorker);
  yield takeEvery(TODOES_UPDATE_REQUEST_ACTION, todoesUpdateWorker);
}