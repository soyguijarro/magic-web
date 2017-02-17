import React from 'react';
import CallToAction from '../CallToAction';

const GeolocationCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="my_location"
    text="See location"
    handleClick={handleClick}
  />
);

export default GeolocationCallToAction;
