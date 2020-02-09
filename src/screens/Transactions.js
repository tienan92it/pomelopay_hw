import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {createLoadingSelector} from '../redux/selectors';
import {FETCH_TRANSACTIONS} from '../redux/actions/actionTypes';
import {
  getTransactions,
  refundTransaction,
} from '../redux/actions/transaction.action';
import TransactionCard from '../components/TransactionCard/TransactionCard';

// Loading state
const transactionsLoadingSelector = createLoadingSelector([FETCH_TRANSACTIONS]);

// Styled
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #29273d;
`;

const Transactions = ({}) => {
  const transactionsLoading = useSelector(transactionsLoadingSelector);
  const transactions = useSelector(
    state => state.transactionReducer.transactions,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const refund = id => () => {
    dispatch(refundTransaction(id));
  };

  if (transactionsLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  function _keyExtractor(item) {
    return item.id;
  }

  function _renderTransaction({item}) {
    const date = moment(item.created).format('MMM DD, YYYY h:mm A');
    return (
      <TransactionCard
        qrcode={item.qr.url}
        state={item.state}
        contact={item.initiatorDetails.contactName}
        date={date}
        amount={item.amount}
        currency={item.currency}
        refund={refund(item.id)}
      />
    );
  }

  return (
    <Container>
      <FlatList
        data={transactions}
        renderItem={_renderTransaction}
        keyExtractor={_keyExtractor}
      />
    </Container>
  );
};

export default React.memo(Transactions);
