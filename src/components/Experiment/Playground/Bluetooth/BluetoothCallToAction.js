import React from 'react';
import CallToAction from '../CallToAction';

const BluetoothCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="lightbulb_outline"
    text="Connect"
    handleClick={handleClick}
  />
);

export default BluetoothCallToAction;
