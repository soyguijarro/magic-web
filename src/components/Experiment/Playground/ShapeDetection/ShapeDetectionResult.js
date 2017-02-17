import React from 'react';
import Message from '../Message';

const ShapeDetectionResult = ({ numberOfFaces }) => {
  const textVerb = numberOfFaces === 1 ? 'is' : 'are';
  const textNoun = `face${numberOfFaces === 1 ? '' : 's'}`;

  return (
    <Message
      iconName={numberOfFaces > 0 ? 'face' : 'landscape'}
      title={numberOfFaces > 0 ? 'People' : 'No people'}
      text={`There ${textVerb} ${numberOfFaces || 'no'} ${textNoun} in the picture`}
    />
  );
};

export default ShapeDetectionResult;
