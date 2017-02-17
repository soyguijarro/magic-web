import React from 'react';

const Icon = ({ name, className, style }) => (
  <i
    className={`material-icons ${className || ''}`}
    style={style}
  >
    { name }
  </i>
);

export default Icon;
