import {takeEvery, call, put, select, SagaReturnType} from "redux-saga/effects";

import {getApi} from "../../libs/Api";

import {
  actions,
  TODOES_CREATE_REQUEST_ACTION, todoesCreateOnFailureAction,
  todoesCreateOnSuccessAction,
  todoesListSelector,
} from "./";

import {Api} from "../../API";
import {IBaseApiCreateRequestAction, IBaseRequestListAction} from "../../libs/redux/types";


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

    console.debug({response});

    yield put(todoesCreateOnSuccessAction(response));

  } catch (e) {
    console.exception(e);

    yield put(todoesCreateOnFailureAction(e));
  }
}

export function* todoesListWatcher() {
  yield takeEvery(actions.GET_LIST.type as string, todoesListWorker);

  yield takeEvery(TODOES_CREATE_REQUEST_ACTION, todoesCreateWorker);
}