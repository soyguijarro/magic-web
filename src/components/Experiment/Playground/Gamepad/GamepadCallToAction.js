import React from 'react';
import CallToAction from '../CallToAction';

const GamepadCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="videogame_asset"
    text="Start game"
    handleClick={handleClick}
  />
);

export default GamepadCallToAction;
