import React from 'react';
import Message from '../Message';
import { SPEECH_EXPERIMENT_DATA } from '../../../../constants';

const SpeechCallToAction = ({ handleLanguageClick }) => (
  <Message
    iconName="language"
    title="Select language"
  >
    <div>
      {
        Object.keys(SPEECH_EXPERIMENT_DATA).map(langCode => (
          <button
            key={langCode}
            className="experiment__playground__content__button"

            onClick={handleLanguageClick.bind(null, langCode)}
          >
            {SPEECH_EXPERIMENT_DATA[langCode].language}
          </button>
        ))
      }
    </div>
  </Message>
);

export default SpeechCallToAction;
