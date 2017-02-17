import React, { Component } from 'react';
import NotSupported from '../NotSupported';
import NotificationsCallToAction from './NotificationsCallToAction';
import NotificationsError from './NotificationsError';
import {
  isServiceWorkerSupported, isNotificationSupported,
  requestNotificationPermission, showNotification
} from '../../../../helpers/notification';

const initialState = {
  isSupported: true,
  hasErrored: false
};

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = initialState

    this.showNotification = this.showNotification.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isServiceWorkerSupported || !isNotificationSupported) {
      this.setState({ isSupported: false });
    }
  }

  showNotification() {
    requestNotificationPermission()
      .then(showNotification)
      .catch(() => this.setState({ hasErrored: true }));
  }

  resetExperiment() {
    this.setState(initialState);
  }

  render() {
    const { isSupported, hasErrored } = this.state;

    if (!isSupported) return <NotSupported />;

    if (hasErrored) {
      return (
        <NotificationsError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    return (
      <NotificationsCallToAction
        handleClick={this.showNotification}
      />
    );
  }
}

export default Notification;
