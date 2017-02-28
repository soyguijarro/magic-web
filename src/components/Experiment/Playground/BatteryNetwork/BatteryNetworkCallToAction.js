import React from 'react';
import CallToAction from '../CallToAction';

const BatteryNetworkCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="perm_device_information"
    text="See info"
    handleClick={handleClick}
  />
);

export default BatteryNetworkCallToAction;
