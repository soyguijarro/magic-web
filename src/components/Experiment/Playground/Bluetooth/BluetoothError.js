import React from 'react';
import ApiError from '../ApiError';

const BluetoothError = ({ handleRetryClick }) => (
  <ApiError
    icon="bluetooth_disabled"
    title="Not connected"
    text="There was a connection problem with your Bluetooth light bulb"
    handleRetryClick={handleRetryClick}
  />
);

export default BluetoothError;
