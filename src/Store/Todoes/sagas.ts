import {call, put, SagaReturnType, takeEvery} from "redux-saga/effects";
import {
  IGetTodoesListAction,
  TODOES_UPDATE_ACTION
} from "./actions/types";
import {IUpdateTodoAction} from "./actions/types";
import {getApi} from "../../settings/remoteAPI";
import {
  getTodoesListOnFailure,
  getTodoesListOnSuccess,
  getTodoesListStartLoading,
  getTodoesListStopLoading,
  updateTodoOnFailure,
  updateTodoOnSuccess
} from "./actions/";
import {TODOES_GET_LIST_ACTION} from "./actions/types";


export function* getTodoesListWorker(action: IGetTodoesListAction) {
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

export function* updateTodoWorker(action: IUpdateTodoAction) {
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

