import React from 'react';
import ApiError from '../ApiError';

const BatteryNetworkError = ({ handleRetryClick }) => (
  <ApiError
    icon="error"
    title="Error"
    text="Something wrong happened while trying to get your device's battery or network info"
    handleRetryClick={handleRetryClick}
  />
);

export default BatteryNetworkError;
