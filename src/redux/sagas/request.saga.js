import {put, takeLatest} from 'redux-saga/effects';
import {REQUEST_SUFFIX, SUCCESS_SUFFIX} from '../actions/actionTypes';

// Start request API
export function* requestStart(type, actions) {
  type += REQUEST_SUFFIX;
  yield takeLatest(type, actions);
}

// Request API success
export function* requestSuccess(type, payload) {
  type += SUCCESS_SUFFIX;
  yield put({
    type,
    payload,
  });
}
