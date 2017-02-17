const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const isSpeechRecognitionSupported = !!SpeechRecognition;
export const isSpeechSynthesisSupported = 'speechSynthesis' in window;

export const startSpeechRecognition = (language, handleStart, handleResult, handleEnd) => {
  const recognition = new SpeechRecognition();
  recognition.lang = language;
  recognition.interimResults = true;

  recognition.start();

  recognition.addEventListener('start', handleStart);
  recognition.addEventListener('result', ({ results }) => {
    const recognizedText = results[results.length - 1][0].transcript;
    handleResult(recognizedText);
  });
  recognition.addEventListener('end', handleEnd);

  return recognition;
};

export const stopSpeechRecognition = (recognition) => {
  recognition.stop();
};

export const synthesizeSpeech = (language, text, handleStart, handleEnd) => {
  const textToSpeech = new SpeechSynthesisUtterance(text);
  textToSpeech.lang = language;

  window.speechSynthesis.speak(textToSpeech);

  textToSpeech.addEventListener('start', handleStart);
  textToSpeech.addEventListener('end', handleEnd);

  return window.speechSynthesis;
}

export const stopSpeechSynthesis = (speech) => {
  speech.cancel();
};
