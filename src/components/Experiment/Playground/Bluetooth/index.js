import React, { Component } from 'react';
import NotSupported from '../NotSupported';
import Loading from '../Loading';
import BluetoothCallToAction from './BluetoothCallToAction';
import BluetoothError from './BluetoothError';
import BluetoothControls from './BluetoothControls';
import {
  isWebBluetoothSupported, connectToBluetoothDevice,
  getBluetoothDeviceCharacteristic, setBluetoothDeviceCharacteristic,
  disconnectFromBluetoothDevice, calculateColorValue,
  TURN_ON_VALUE, TURN_OFF_VALUE
} from '../../../../helpers/bluetooth';
import {
  startListeningToAcceleration, stopListeningToAcceleration
} from '../../../../helpers/deviceMotion';
import { isVibrationSupported, vibrate } from '../../../../helpers/vibration';
import getRandomRgbColor from '../../../../utils/getRandomRgbColor';
import { BLUETOOTH_EXPERIMENT_DATA } from '../../../../constants';

const initialState = {
  isSupported: true,
  isConnecting: false,
  hasErrored: false,
  isConnected: false,
  isTurnedOn: true,
  lightColor: null
};

class Bluetooth extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.connectedDevice = null;
    this.deviceCharacteristic = null;
    this.lightBulbColorsInterval = null;
    this.isVibrating = false;

    this.connectToLightBulb = this.connectToLightBulb.bind(this);
    this.toggleLightBulbPower = this.toggleLightBulbPower.bind(this);
    this.setLightBulbRgbColor = this.setLightBulbRgbColor.bind(this);
    this.handleDeviceAcceleration = this.handleDeviceAcceleration.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isWebBluetoothSupported) return this.setState({ isSupported: false });
  }

  componentWillUnmount() {
    if (this.lightBulbColorsInterval) clearInterval(this.lightBulbColorsInterval);
    if (this.connectedDevice) disconnectFromBluetoothDevice(this.connectedDevice);
    stopListeningToAcceleration();
  }

  connectToLightBulb() {
    const {
      LIGHT_BULB_SERVICE, LIGHT_BULB_CHARACTERISTIC
    } = BLUETOOTH_EXPERIMENT_DATA;

    this.setState({ isConnecting: true });

    connectToBluetoothDevice(LIGHT_BULB_SERVICE)
      .then(({ device, server }) => {
        this.connectedDevice = device;

        return getBluetoothDeviceCharacteristic(
          server, LIGHT_BULB_SERVICE, LIGHT_BULB_CHARACTERISTIC
        );
      })
      .then(characteristic => {
        this.deviceCharacteristic = characteristic;
        this.toggleLightBulbPower();
        startListeningToAcceleration(this.handleDeviceAcceleration);
        this.setState({ isConnecting: false, isConnected: true });
      })
      .catch(() => this.setState({ hasErrored: true }));
  }

  toggleLightBulbPower() {
    if (!this.deviceCharacteristic) return;

    this.setState(({ isTurnedOn }) => {
      setBluetoothDeviceCharacteristic(
        this.deviceCharacteristic,
        isTurnedOn ? TURN_OFF_VALUE : TURN_ON_VALUE
      )
      .then(() => {
        this.lightBulbColorsInterval = isTurnedOn ?
          clearInterval(this.lightBulbColorsInterval) :
          setInterval(() => { this.setLightBulbRgbColor(...getRandomRgbColor()); }, 500);
      })
       .catch(() => this.setState({ hasErrored: true }));

      return { isTurnedOn: !isTurnedOn };
    })
  }

  handleDeviceAcceleration(acceleration) {
    const THRESHOLD_VALUE = 30;
    if (
      !this.state.isConnected || this.isVibrating ||
      (acceleration.x < THRESHOLD_VALUE && acceleration.y < THRESHOLD_VALUE)
    ) {
      return;
    }

    if (this.lightBulbColorsInterval) clearInterval(this.lightBulbColorsInterval);

    this.toggleLightBulbPower();
    if (isVibrationSupported) vibrate();

    this.isVibrating = true;
    setTimeout(() => { this.isVibrating = false; }, 1000);
  }

  setLightBulbRgbColor(red, green, blue) {
    const colorValue = calculateColorValue(red, green, blue);
    return setBluetoothDeviceCharacteristic(this.deviceCharacteristic, colorValue)
      .then(() => this.setState({ lightColor: [red, green, blue] }))
      .catch(() => this.setState({ hasErrored: true }));
  }

  resetExperiment() {
    this.setState(initialState);
    this.componentWillUnmount();
  }

  render() {
    const { isSupported, isConnecting, hasErrored, isConnected, isTurnedOn, lightColor } = this.state;

    if (!isSupported) return <NotSupported />;

    if (hasErrored) {
      return (
        <BluetoothError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    if (isConnecting) return <Loading />;

    if (isConnected) {
      return (
        <BluetoothControls
          handlePowerClick={this.toggleLightBulbPower}
          isTurnedOn={isTurnedOn}
          lightColor={lightColor}
        />
      );
    }

    return (
      <BluetoothCallToAction
        handleClick={this.connectToLightBulb}
      />
    );
  }
}

export default Bluetooth;
