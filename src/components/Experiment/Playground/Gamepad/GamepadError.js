import React from 'react';
import ApiError from '../ApiError';

const GamepadError = ({ handleRetryClick }) => (
  <ApiError
    icon="not_interested"
    title="No gamepad"
    text="There was a connection problem with your gamepad. Please make sure that it is plugged in."
    handleRetryClick={handleRetryClick}
  />
);

export default GamepadError;
