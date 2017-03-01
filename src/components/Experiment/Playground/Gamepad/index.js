import React, { Component } from 'react';
import NotSupported from '../NotSupported';
import GamepadConnecting from './GamepadConnecting';
import GamepadCallToAction from './GamepadCallToAction';
import GamepadDisplay from './GamepadDisplay';
import GamepadError from './GamepadError';
import {
  isGamepadSupported, connectToGamepad, subscribeToGamepadDisconnection,
  getGamepadPressedButtonIndex, getGamepadAxisDirectionPressed,
} from '../../../../helpers/gamepad';

const initialState = {
  isSupported: true,
  isConnecting: false,
  didConnect: false,
  hasErrored: false,
  buttonPressed: null,
  axisDirectionPressed: null,
};

class Gamepad extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.gamepadIndex = null;
    this.gameLoopId = null;

    this.startGame = this.startGame.bind(this);
    this.handleGamepadConnected = this.handleGamepadConnected.bind(this);
    this.handleGamepadDisconnected = this.handleGamepadDisconnected.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isGamepadSupported) this.setState({ isSupported: false });
  }

  componentWillUnmount() {
    if (this.gameLoopId) cancelAnimationFrame(this.gameLoopId);
  }

  startGame() {
    this.setState({ isConnecting: true });

    connectToGamepad()
      .then(this.handleGamepadConnected)
      .catch(this.handleGamepadDisconnected);
  }

  handleGamepadConnected(gamepad) {
    this.gamepadIndex = gamepad.index;
    this.setState({ isConnecting: false, didConnect: true });
    subscribeToGamepadDisconnection(this.handleGamepadDisconnected);
    this.gameLoop();
  }

  handleGamepadDisconnected() {
    cancelAnimationFrame(this.gameLoopId);
    this.setState({ isConnecting: false, hasErrored: true });
  }

  gameLoop() {
    const buttonPressed = getGamepadPressedButtonIndex(this.gamepadIndex);
    const axisDirectionPressed = getGamepadAxisDirectionPressed(this.gamepadIndex);
    this.setState({ buttonPressed, axisDirectionPressed });

    this.gameLoopId = requestAnimationFrame(this.gameLoop);
  }

  resetExperiment() {
    this.setState(initialState);
    this.componentWillUnmount();
  }

  render() {
    const {
      isSupported, isConnecting, hasErrored, didConnect,
      buttonPressed, axisDirectionPressed
    } = this.state;

    if (!isSupported) return <NotSupported />;

    if (isConnecting) return <GamepadConnecting />;

    if (hasErrored) {
      return (
        <GamepadError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    if (didConnect) {
      return (
        <GamepadDisplay
          buttonPressed={buttonPressed}
          axisDirectionPressed={axisDirectionPressed}
        />
      );
    }

    return (
      <GamepadCallToAction
        handleClick={this.startGame}
      />
    );
  }
}

export default Gamepad;
