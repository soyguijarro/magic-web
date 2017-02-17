import React from 'react';
import Message from './Message';

const NotSupported = () => (
  <Message
    iconName="sentiment_dissatisfied"
    title="Not supported"
    text="The required Web APIs for this demo are not supported by your browser"
  />
);

export default NotSupported;
