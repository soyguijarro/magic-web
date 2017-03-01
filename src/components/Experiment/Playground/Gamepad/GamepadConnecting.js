import React from 'react';
import Message from '../Message';

const GamepadConnecting = () => (
  <Message
    iconName="gamepad"
    iconClassModifier="spin"
    title="Connecting"
    text="Press any button in your gamepad"
  />
);

export default GamepadConnecting;
