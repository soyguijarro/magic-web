import React from 'react';
import Icon from '../../Icon';

const Message = ({ iconName, iconClassModifier, iconStyle, title, text, innerHTMLText, children }) => (
  <div
    className="experiment__playground__content--message"
  >
    <Icon
      name={iconName}
      className={
        `experiment__playground__content--message__icon${iconClassModifier ? `--${iconClassModifier}` : ''}`
      }
      style={iconStyle}
    />
    {title &&
      <h1
        className="experiment__playground__content--message__title"
      >
        {title}
      </h1>
    }
    {text &&
      <p
        className="experiment__playground__content--message__text"
      >
        {text}
      </p>
    }
    {innerHTMLText &&
      <p
        className="experiment__playground__content--message__text"
        dangerouslySetInnerHTML={{ __html: innerHTMLText }}
      />
    }
    {children}
  </div>
);

export default Message;
