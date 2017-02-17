import React from 'react';
import Message from './Message';

const CallToAction = ({ icon, text, handleClick, children }) => (
  <Message
    iconName={icon}
  >
    <button
      className="experiment__playground__content__button"
      onClick={handleClick}
    >
      {text}
    </button>
    {children}
  </Message>
);

export default CallToAction;
