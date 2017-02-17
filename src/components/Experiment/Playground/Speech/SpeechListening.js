import React from 'react';
import Message from '../Message';

const SpeechListening = ({ oscillatingIndicator, correctnessClassName }) => (
  <Message
    iconName={oscillatingIndicator ? 'mic' : 'mic_none'}
    iconClassModifier={correctnessClassName}
    title="Repeat"
  />
);

export default SpeechListening;
