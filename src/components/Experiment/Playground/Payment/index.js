import React, { Component } from 'react';
import NotSupported from '../NotSupported';
import Loading from '../Loading';
import PaymentCallToAction from './PaymentCallToAction';
import PaymentSuccessful from './PaymentSuccessful';
import PaymentNotSuccessful from './PaymentNotSuccessful';
import { isPaymentRequestSupported, requestPayment } from '../../../../helpers/payment';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSupported: true,
      didRequest: false,
      hasErrored: false
    };

    this.requestPayment = this.requestPayment.bind(this);
  }

  componentDidMount() {
    if (!isPaymentRequestSupported) this.setState({ isSupported: false });
  }

  requestPayment() {
    this.setState({ didRequest: true, isLoading: true });

    requestPayment()
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, hasErrored: true }));
  }

  render() {
    const { isSupported, didRequest, isLoading, hasErrored } = this.state;

    if (!isSupported) return <NotSupported />;

    if (!didRequest) {
      return (
        <PaymentCallToAction
          handleClick={this.requestPayment}
        />
      );
    }

    if (isLoading) return <Loading />;

    if (hasErrored) return <PaymentNotSuccessful />;

    return <PaymentSuccessful />;
  }
}

export default Payment;
