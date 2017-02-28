import React from 'react';
import Message from '../Message';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';

const ICONS_BY_NETWORK_TYPE = {
  wifi: 'network_wifi',
  cellular: 'network_cell',
  bluetooth: 'bluetooth',
  ethernet: 'settings_ethernet',
  wimax: 'network_wifi',
  none: 'airplanemode_active'
};

const BatteryNetworkDisplay = ({ isBatteryCharging, batteryLevel, networkType }) => {
  const getBatteryIcon = () => {
    if (isBatteryCharging) return 'battery_charging_full';
    if (batteryLevel) return 'battery_full';
    return 'battery_unknown';
  };

  return (
    <div className="experiment__playground__content__wrapper">
      <Message
        iconName={getBatteryIcon()}
        text={batteryLevel ? `${batteryLevel * 100}%` : 'Unknown'}
      />
      <Message
        iconName={ICONS_BY_NETWORK_TYPE[networkType] || 'priority_high'}
        text={capitalizeFirstLetter(networkType)}
      />
    </div>
  );
};

export default BatteryNetworkDisplay;
