export const isPaymentRequestSupported = 'PaymentRequest' in window;

export const requestPayment = () => {
  const methodData = [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard'],
    },
  }];
  const details = {
    displayItems: [
      {
        label: 'FrontFest 2018 ticket',
        amount: { currency: 'EUR', value: '25.00' },
      },
      {
        label: 'Unicorn stickers',
        amount: { currency: 'EUR', value: '5.00' },
      },
    ],
    total: {
      label: 'Total',
      amount: { currency: 'EUR', value: '30.00' },
    }
  };
  const options = {
    requestPayerName: true,
    requestPayerEmail: true
  };
  const request = new window.PaymentRequest(methodData, details, options);

  return request.show()
    .then((paymentResponse) => {
      paymentResponse.complete('success');
      return Promise.resolve();
    });
}
