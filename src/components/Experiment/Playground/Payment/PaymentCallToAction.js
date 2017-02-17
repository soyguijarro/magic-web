import React from 'react';
import CallToAction from '../CallToAction';

const PaymentCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="credit_card"
    text="Tap to pay"
    handleClick={handleClick}
  />
);

export default PaymentCallToAction;
