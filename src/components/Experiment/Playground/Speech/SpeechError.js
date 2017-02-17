import React from 'react';
import ApiError from '../ApiError';

const SpeechError = ({ handleRetryClick }) => (
  <ApiError
    icon="mic_off"
    title="No microphone"
    text="We couldn't access your microphone. Please make sure your device actually has a microphone and you gave permission."
    handleRetryClick={handleRetryClick}
  />
);

export default SpeechError;
