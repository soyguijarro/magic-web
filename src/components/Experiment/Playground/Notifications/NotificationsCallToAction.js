import React from 'react';
import CallToAction from '../CallToAction';

const NotificationsCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="notifications"
    text="Notify now"
    handleClick={handleClick}
  />
);

export default NotificationsCallToAction;
