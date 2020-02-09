import {all} from 'redux-saga/effects';
import {FETCH_TRANSACTIONS} from '../actions/actionTypes';
import * as TransactionService from '../../services/TransactionService';
import {requestStart, requestSuccess} from './request.saga';

function* fetchTransactions() {
  const transactions = yield TransactionService.getTransactions();
  yield requestSuccess(FETCH_TRANSACTIONS, transactions);
}
function* actionWatcher() {
  yield requestStart(FETCH_TRANSACTIONS, fetchTransactions);
}
export default function* transactionSaga() {
  yield all([actionWatcher()]);
}
