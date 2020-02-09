import {combineReducers} from 'redux';
import loadingReducer from './loading.reducer';
import errorReducer from './error.reducer';
import transactionReducer from './transaction.reducer';

export default combineReducers({
  loadingReducer,
  errorReducer,
  transactionReducer,
});
