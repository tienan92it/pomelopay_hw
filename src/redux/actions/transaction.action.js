import {
  FETCH_TRANSACTIONS,
  REQUEST_SUFFIX,
  REFUND_TRANSACTION,
} from './actionTypes';

export const getTransactions = () => ({
  type: FETCH_TRANSACTIONS + REQUEST_SUFFIX,
});

export const refundTransaction = id => ({
  type: REFUND_TRANSACTION,
  payload: id,
});
