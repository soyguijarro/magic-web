import React from 'react';
import Message from '../Message';

const SpeechResult = ({ recognizedTextHtml }) => (
  <Message
    iconName="record_voice_over"
    title="Results"
    innerHTMLText={recognizedTextHtml}
  />
);

export default SpeechResult;
