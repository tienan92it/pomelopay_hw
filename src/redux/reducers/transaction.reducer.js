import {
  SUCCESS_SUFFIX,
  FETCH_TRANSACTIONS,
  REFUND_TRANSACTION,
} from '../actions/actionTypes';

const initialState = {
  transactions: [],
};

// Load all transactions to state
const applyTransactions = (state, action) => ({
  ...state,
  transactions: action.payload,
});

const refundTransaction = (state, action) => {
  const {transactions} = state;
  const transId = action.payload;
  const refundTransIndex = transactions.findIndex(
    trans => trans.id === transId,
  );
  if (refundTransIndex !== -1) {
    transactions[refundTransIndex].state = 'REFUNDED';
    return {...state, transactions: [...transactions]};
  } else {
    return state;
  }
};

const transactionReducer = (state = initialState, action) => {
  console.log(action);
  const type = action.type.replace(SUCCESS_SUFFIX, '');
  switch (type) {
    case FETCH_TRANSACTIONS:
      return applyTransactions(state, action);
    case REFUND_TRANSACTION:
      return refundTransaction(state, action);
    default: {
      return state;
    }
  }
};

export default transactionReducer;
