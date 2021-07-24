import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import { controller } from '../api/ws/socketController';

import restController from '../api/rest/restController.js';

const userController = restController.userController;

export function* privateSaga(action) {
  yield put({ type: ACTION.GET_USER_REQUEST });
  try {
    const { data } = yield userController.getUser();
    yield put({ type: ACTION.GET_USER_SUCCESS, data });
    controller.subscribe(data.id);
  } catch (e) {
    yield put({ type: ACTION.GET_USER_ERROR, error: e.response });
  }
}

export function* notAuthorizeSaga(action) {
  yield put({ type: ACTION.GET_USER_REQUEST });
  try {
    const { data } = yield userController.getUser();
    action.replace('/');
    yield put({ type: ACTION.GET_USER_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_USER_ERROR, error: e });
  }
}

export function* updateUserData(action) {
  try {
    const { data } = yield userController.updateUser(action.data);
    yield put({ type: ACTION.UPDATE_USER_DATA_SUCCESS, data });
    yield put({ type: ACTION.CHANGE_EDIT_MODE_ON_USER_PROFILE, data: false });
  } catch (e) {
    yield put({ type: ACTION.UPDATE_USER_DATA_ERROR, error: e.response });
  }
}

export function* headerRequest() {
  yield put({ type: ACTION.GET_USER_REQUEST });
  try {
    const { data } = yield userController.getUser();
    yield put({ type: ACTION.GET_USER_SUCCESS, data });
    controller.subscribe(data.id);
  } catch (e) {
    yield put({ type: ACTION.GET_USER_ERROR, error: e.response });
  }
}
