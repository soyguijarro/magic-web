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
        label: 'Codemotion 2018 ticket',
        amount: { currency: 'EUR', value: '40.00' },
      },
      {
        label: 'Unicorn stickers',
        amount: { currency: 'EUR', value: '5.00' },
      },
    ],
    total: {
      label: 'Total',
      amount: { currency: 'EUR', value: '45.00' },
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
