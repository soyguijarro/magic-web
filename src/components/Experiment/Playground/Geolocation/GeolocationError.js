import React from 'react';
import ApiError from '../ApiError';

const GeolocationError = ({ handleRetryClick }) => (
  <ApiError
    icon="location_off"
    title="No location"
    text="We couldn't get your position. Please make sure you gave permission and your device's location is on."
    handleRetryClick={handleRetryClick}
  />
);

export default GeolocationError;
