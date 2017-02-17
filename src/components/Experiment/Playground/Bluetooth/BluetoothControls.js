import React from 'react';
import Icon from '../../../Icon';

const BluetoothControls = ({ handlePowerClick, isTurnedOn, lightColor }) => {
  const iconColorStyleProperty = isTurnedOn && lightColor ?
    `rgb(${lightColor[0]}, ${lightColor[1]}, ${lightColor[2]}` : undefined;

  return (
    <div className="experiment__playground__content--message">
      <span
        onClick={handlePowerClick}
      >
        <Icon
          className="experiment__playground__content--message__icon--big"
          name="power_settings_new"
          style={{ color: iconColorStyleProperty }}
        />
      </span>
    </div>
  );
};

export default BluetoothControls;
