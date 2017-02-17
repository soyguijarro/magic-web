import React from 'react';
import CallToAction from '../CallToAction';

const NotificationsCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="message"
    text="Notify now"
    handleClick={handleClick}
  />
);

export default NotificationsCallToAction;
