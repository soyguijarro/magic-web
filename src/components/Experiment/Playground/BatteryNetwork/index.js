import React, { Component } from 'react';
import NotSupported from '../NotSupported';
import Loading from '../Loading';
import BatteryNetworkCallToAction from './BatteryNetworkCallToAction';
import BatteryNetworkDisplay from './BatteryNetworkDisplay';
import BatteryNetworkError from './BatteryNetworkError';
import {
  isBatteryStatusSupported, requestBatteryInfo, subscribeToBatteryChanges,
  unsubscribeFromBatteryChanges
} from '../../../../helpers/batteryStatus';
import {
  isNetworkInformationSupported, getNetworkType, subscribeToNetworkChanges,
  unsubscribeFromNetworkChanges
} from '../../../../helpers/networkInformation';
import { isVibrationSupported, vibrate } from '../../../../helpers/vibration';

const initialState = {
  isSupported: true,
  isLoading: false,
  didRequest: false,
  hasErrored: false,
  isBatteryCharging: null,
  batteryLevel: null,
  networkType: null
};

class BatteryNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.showInfo = this.showInfo.bind(this);
    this.updateBatteryInfo = this.updateBatteryInfo.bind(this);
    this.updateNetworkInfo = this.updateNetworkInfo.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isBatteryStatusSupported || !isNetworkInformationSupported) {
      this.setState({ isSupported: false });
    }
  }

  componentWillUnmount() {
    unsubscribeFromBatteryChanges();
    unsubscribeFromNetworkChanges();
  }

  showInfo() {
    this.setState({ didRequest: true, isLoading: true });

    requestBatteryInfo()
      .then((battery) => {
        this.updateBatteryInfo(battery);
        subscribeToBatteryChanges(this.updateBatteryInfo);
        this.setState({ isLoading: false });
      })
      .catch(() => this.setState({ isLoading: false, hasErrored: true }));

    this.setState({ networkType: getNetworkType() });
    subscribeToNetworkChanges(this.updateNetworkInfo);
  }

  updateBatteryInfo({ charging, level }) {
    this.setState(prevState => {
      if (
        isVibrationSupported &&
        prevState.isBatteryCharging !== null && prevState.isBatteryCharging !== charging
      ) {
        vibrate();
      }
      return { isBatteryCharging: charging, batteryLevel: level };
    });
  }

  updateNetworkInfo(type) {
    this.setState({ networkType: type });
  }

  resetExperiment() {
    this.setState(initialState);
    this.componentWillUnmount();
    this.componentDidMount();
  }

  render() {
    const {
      isSupported, isLoading, didRequest, hasErrored, isBatteryCharging, batteryLevel, networkType
    } = this.state;

    if (!isSupported) return <NotSupported />;

    if (isLoading) return <Loading />;

    if (hasErrored) {
      return (
        <BatteryNetworkError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    if (didRequest) {
      return (
        <BatteryNetworkDisplay
          isBatteryCharging={isBatteryCharging}
          batteryLevel={batteryLevel}
          networkType={networkType}
        />
      );
    }

    return (
      <BatteryNetworkCallToAction
        handleClick={this.showInfo}
      />
    );
  }
}

export default BatteryNetwork;
