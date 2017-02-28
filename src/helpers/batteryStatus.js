export const isBatteryStatusSupported = 'getBattery' in navigator;

let battery = null;

export const requestBatteryInfo = () => (
  navigator.getBattery()
    .then((batt) => {
      battery = batt;
      return batt;
    })
);

let handleBatteryChargingOrLevelChange = null;

const handleBatteryChange = handleChange => () => {
  handleChange(battery);
};

export const subscribeToBatteryChanges = (handleChange) => {
  if (!battery) return;

  handleBatteryChargingOrLevelChange = handleBatteryChange(handleChange);
  battery.addEventListener('chargingchange', handleBatteryChargingOrLevelChange);
  battery.addEventListener('levelchange', handleBatteryChargingOrLevelChange);
};

export const unsubscribeFromBatteryChanges = () => {
  if (!battery) return;

  battery.removeEventListener('chargingchange', handleBatteryChargingOrLevelChange);
  battery.removeEventListener('levelchange', handleBatteryChargingOrLevelChange);
};
