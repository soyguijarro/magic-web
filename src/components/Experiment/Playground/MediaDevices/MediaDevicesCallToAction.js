import React from 'react';
import CallToAction from '../CallToAction';

const MediaDevicesCallToAction = ({ handleClick }) => (
  <CallToAction
    icon="videocam"
    text="Start camera"
    handleClick={handleClick}
  />
);

export default MediaDevicesCallToAction;
