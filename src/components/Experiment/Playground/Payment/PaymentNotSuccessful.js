import React from 'react';
import Message from '../Message';

const PaymentNotSuccessful = () => (
  <Message
    iconName="money_off"
    title="Not payed"
    text="You either cancelled the payment or something wrong happened along the process"
  />
);

export default PaymentNotSuccessful;
