import React from 'react';
import ApiError from '../ApiError';

const NotificationsError = ({ handleRetryClick }) => (
  <ApiError
    icon="notifications_off"
    title="No notification"
    text="We could't send the notification. Please make sure you gave permission."
    handleRetryClick={handleRetryClick}
  />
);

export default NotificationsError;
