import React, { Component } from 'react';
import NotSupported from '../NotSupported';
import Loading from '../Loading';
import SpeechCallToAction from './SpeechCallToAction';
import SpeechError from './SpeechError';
import SpeechSpeaking from './SpeechSpeaking';
import SpeechListening from './SpeechListening';
import SpeechResult from './SpeechResult';
import {
  isSpeechRecognitionSupported, startSpeechRecognition, stopSpeechRecognition,
  isSpeechSynthesisSupported, synthesizeSpeech, stopSpeechSynthesis
} from '../../../../helpers/speech';
import {
  getTextMatchingFactor, getHtmlColoredTextByMatch
} from '../../../../utils/textMatching';
import { SPEECH_EXPERIMENT_DATA } from '../../../../constants';

const initialState = {
  isSupported: true,
  didStart: false,
  hasErrored: false,
  isSpeaking: false,
  isListening: false,
  oscillatingIndicator: false,
  correctnessClassName: null,
  recognizedTextHtml: ''
};

class Speech extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.speech = null;
    this.recognition = null;
    this.permissionTimerId = null;
    this.languageCode = null;

    this.startPronunciationTest = this.startPronunciationTest.bind(this);
    this.handleStartSpeechSynthesis = this.handleStartSpeechSynthesis.bind(this);
    this.handleStopSpeechSynthesis = this.handleStopSpeechSynthesis.bind(this);
    this.startSpeechRecognition = this.startSpeechRecognition.bind(this);
    this.handleSpeechRecognitionStart = this.handleSpeechRecognitionStart.bind(this);
    this.handleSpeechRecognitionResult = this.handleSpeechRecognitionResult.bind(this);
    this.handleSpeechRecognitionEnd = this.handleSpeechRecognitionEnd.bind(this);
    this.handlePermissionError = this.handlePermissionError.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isSpeechSynthesisSupported || !isSpeechRecognitionSupported) {
      return this.setState({ isSupported: false });
    }
  }

  componentWillUnmount() {
    if (this.speech) stopSpeechSynthesis(this.speech);
    if (this.recognition) stopSpeechRecognition(this.recognition);
    if (this.permissionTimerId) clearTimeout(this.permissionTimerId);
  }

  startPronunciationTest(languageCode) {
    this.setState({ didStart: true });

    this.languageCode = languageCode;
    this.speech = synthesizeSpeech(
      languageCode, SPEECH_EXPERIMENT_DATA[languageCode].sentence,
      this.handleStartSpeechSynthesis, this.handleStopSpeechSynthesis
    );
  }

  handleStartSpeechSynthesis() {
    this.setState({ isSpeaking: true });
  }

  handleStopSpeechSynthesis() {
    this.setState({ isSpeaking: false });
    this.startSpeechRecognition();
  }

  startSpeechRecognition() {
    this.permissionTimerId = setTimeout(this.handlePermissionError, 5000);
    this.recognition = startSpeechRecognition(
      this.languageCode,
      this.handleSpeechRecognitionStart,
      this.handleSpeechRecognitionResult,
      this.handleSpeechRecognitionEnd
    );
  }

  handleSpeechRecognitionStart() {
    if (this.permissionTimerId) clearTimeout(this.permissionTimerId);
    this.setState({ isListening: true, hasErrored: false });
  }

  handleSpeechRecognitionResult(recognizedText) {
    const { sentence } = SPEECH_EXPERIMENT_DATA[this.languageCode];

    this.setState(prevState => ({
      oscillatingIndicator: !prevState.oscillatingIndicator,
      recognizedTextHtml: getHtmlColoredTextByMatch(sentence, recognizedText),
      correctnessClassName: getTextMatchingFactor(sentence, recognizedText) > 0.7 ? 'green' : 'red'
    }));
  }

  handleSpeechRecognitionEnd() {
    this.setState({ isListening: false });
  }

  handlePermissionError() {
    this.setState({ hasErrored: true });
  }

  resetExperiment() {
    this.setState(initialState);
    this.componentWillUnmount();
  }

  render() {
    const {
      isSupported, didStart, hasErrored, isSpeaking, isListening, oscillatingIndicator,
      correctnessClassName, recognizedTextHtml
    } = this.state;

    if (!isSupported) return <NotSupported />;

    if (hasErrored) {
      return (
        <SpeechError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    if (isSpeaking) return <SpeechSpeaking />;

    if (isListening) {
      return (
        <SpeechListening
          oscillatingIndicator={oscillatingIndicator}
          correctnessClassName={correctnessClassName}
        />
      );
    }

    if (didStart && !recognizedTextHtml) return <Loading />;

    if (recognizedTextHtml) {
      return (
        <SpeechResult
          recognizedTextHtml={recognizedTextHtml}
        />
      );
    }

    return (
      <SpeechCallToAction
        handleLanguageClick={this.startPronunciationTest}
      />
    );
  }
}

export default Speech;
