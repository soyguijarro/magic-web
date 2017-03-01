import React from 'react';
import Message from '../Message';

const ICONS_BY_AXIS_DIRECTION = {
  UP: 'keyboard_arrow_up',
  DOWN: 'keyboard_arrow_down',
  LEFT: 'keyboard_arrow_left',
  RIGHT: 'keyboard_arrow_right',
};

const GamepadDisplay = ({ buttonPressed, axisDirectionPressed }) => (
  <div className="experiment__playground__content__wrapper">
    <Message
      iconName={ICONS_BY_AXIS_DIRECTION[axisDirectionPressed] || 'priority_high'}
      text="Direction"
    />
    <Message
      iconName={buttonPressed ? 'lens' : 'radio_button_unchecked'}
      text="Buttons"
    />
  </div>
);

export default GamepadDisplay;
