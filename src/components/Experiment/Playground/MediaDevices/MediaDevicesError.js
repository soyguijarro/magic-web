import React from 'react';
import ApiError from '../ApiError';

const MediaDevicesError = ({ handleRetryClick }) => (
  <ApiError
    icon="videocam_off"
    title="No camera"
    text="We couldn't access your camera. Please make sure your device actually has a camera and you gave permission."
    handleRetryClick={handleRetryClick}
  />
);

export default MediaDevicesError;
