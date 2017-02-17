import React from 'react';
import Message from '../Message';

const ShapeDetectionError = ({ handleRetryClick }) => (
  <Message
    iconName="report_problem"
    title="Error"
    text="Something happened and we couldn't process the photo"
    handleRetryClick={handleRetryClick}
  />
);

export default ShapeDetectionError;
