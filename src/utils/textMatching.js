const isWordInText = text => word => text.toLowerCase().includes(word.toLowerCase());
const getMatchingWords = (referenceText, text) => {
  const referenceWords = referenceText.split(' ');
  return referenceWords.filter(isWordInText(text));
}

export const getTextMatchingFactor = (referenceText, text) => {
  const matchingWords = getMatchingWords(referenceText, text);
  const words = text.split(' ');

  return matchingWords.length / words.length;
};

export const getHtmlColoredTextByMatch = (referenceText, text) => {
  const matchingWords = getMatchingWords(referenceText, text);

  return referenceText
    .split(' ')
    .map(word => {
      const wordColor = matchingWords.includes(word) ? '#4caf50' : '#f44336';
      return `<span style="color: ${wordColor};">${word}</span>`;
    })
    .join(' ');
};
