export const isWebBluetoothSupported = 'bluetooth' in navigator;

export const connectToBluetoothDevice = (service) => {
  const options = {
    filters: [{
      services: [service]
    }]
  };

  return navigator.bluetooth.requestDevice(options)
    .then(device => (
      device.gatt.connect()
        .then(server => ({ device, server }))
    ))
};

export const getBluetoothDeviceCharacteristic = (server, service, characteristic) => (
  server.getPrimaryService(service)
    .then(service => service.getCharacteristic(characteristic))
);

export const setBluetoothDeviceCharacteristic = (characteristic, value) => (
  characteristic.writeValue(value)
);

export const disconnectFromBluetoothDevice = (device) => {
  if (!device.gatt.connected) return Promise.resolve();
  return device.gatt.disconnect();
};

export const calculateColorValue = (red, green, blue) => (
  new Uint8Array([0x56, red, green, blue, 0x00, 0xF0, 0xAA])
);

export const TURN_ON_VALUE = new Uint8Array([0xcc, 0x23, 0x33]);

export const TURN_OFF_VALUE = new Uint8Array([0xcc, 0x24, 0x33]);
