import React from 'react';
import CallToAction from '../CallToAction';

const GeolocationCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="my_location"
    text="Show location"
    handleClick={handleClick}
  />
);

export default GeolocationCallToAction;
