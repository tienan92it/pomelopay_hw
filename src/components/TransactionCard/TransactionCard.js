import React from 'react';
import styled from 'styled-components/native';
import {STATE_COLORS} from '../../constants/Colors';

const STATE = {
  CONFIRMED: 'CONFIRMED',
  QR_CODE_GENERATED: 'QR_CODE_GENERATED',
  REMITTED: 'REMITTED',
  INITIATED: 'INITIATED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
};

const TransitionCard = ({
  qrcode,
  state,
  contact,
  date,
  amount,
  currency,
  refund,
}) => {
  const canRefund = state === STATE.CONFIRMED;
  return (
    <Container>
      <QRCode source={{uri: qrcode}} />
      <DetailContent>
        <State color={STATE_COLORS[state] || STATE_COLORS.DEFAULT}>
          {state}
        </State>
        <Title>{contact}</Title>
        <SubTitle>{date}</SubTitle>
      </DetailContent>
      <Amount
        color={
          STATE_COLORS[state] || STATE_COLORS.DEFAULT
        }>{`${amount}\n${currency}`}</Amount>
      {canRefund && (
        <ButtonWrapper onPress={refund}>
          <ButtonText>Refund</ButtonText>
        </ButtonWrapper>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  border-radius: 4px;
  margin: 10px 20px;
  padding: 10px;
  background-color: #353347;
  align-items: center;
`;

const QRCode = styled.Image`
  width: 48px;
  height: 48px;
`;

const DetailContent = styled.View`
  flex-direction: column;
  margin-left: 10px;
`;

const State = styled.Text`
  color: ${props => props.color};
  font-size: 10px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const SubTitle = styled.Text`
  color: #d2d2d2;
  font-size: 12px;
`;

const Amount = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  align-self: center;
  margin-left: auto;
`;

const ButtonWrapper = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  margin-left: auto;
`;

const ButtonText = styled.Text`
  color: #000;
  text-align: center;
`;

export default React.memo(TransitionCard);
