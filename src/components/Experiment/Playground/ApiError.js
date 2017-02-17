import React from 'react';
import Message from './Message';

const ApiError = ({ icon, title, text, handleRetryClick }) => (
  <Message
    iconName={icon}
    title={title}
    text={text}
  >
    <button
      className="experiment__playground__content__button"
      onClick={handleRetryClick}
    >
      Try again
    </button>
  </Message>
);

export default ApiError;
