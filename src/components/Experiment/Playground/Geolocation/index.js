import React, { Component } from 'react';
import { map, tileLayer, marker, icon } from 'leaflet';
import NotSupported from '../NotSupported';
import Loading from '../Loading';
import GeolocationCallToAction from './GeolocationCallToAction';
import GeolocationError from './GeolocationError';
import {
  isGeolocationSupported, requestGeolocation, stopGeolocation
} from '../../../../helpers/geolocation';
import markerIconUrl from '../../../../images/icon.png';

const initialState = {
  isSupported: true,
  didRequest: false,
  isLoading: false,
  hasErrored: false
};

class Geolocation extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.mapObject = null;
    this.mapMarker = null;
    this.geolocationWatchId = null;

    this.requestGeolocation = this.requestGeolocation.bind(this);
    this.handleGeolocationSuccess = this.handleGeolocationSuccess.bind(this);
    this.handleGeolocationFailure = this.handleGeolocationFailure.bind(this);
    this.createMap = this.createMap.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isGeolocationSupported) this.setState({ isSupported: false });
  }

  componentWillUnmount() {
    stopGeolocation(this.geolocationWatchId);
  }

  requestGeolocation() {
    this.setState({ didRequest: true, isLoading: true });

    this.geolocationWatchId = requestGeolocation(
      this.handleGeolocationSuccess,
      this.handleGeolocationFailure
    );
  }

  handleGeolocationSuccess(latitude, longitude) {
    if (this.mapObject) return this.updateMap(latitude, longitude);

    this.setState({ isLoading: false }, () => this.createMap(latitude, longitude));
  }

  handleGeolocationFailure() {
    this.setState({ isLoading: false, hasErrored: true });
  }

  createMap(latitude, longitude) {
    this.mapObject = map(this.mapElement, { zoomControl: false });
    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.mapObject);

    this.updateMap(latitude, longitude);
  }

  updateMap(latitude, longitude) {
    this.mapObject.setView([latitude, longitude], 20);

    if (this.mapMarker) this.mapMarker.remove();
    const markerIcon = icon({
      iconUrl: markerIconUrl,
      iconSize:     [48, 48],
      iconAnchor:   [24, 24],
    })
    this.mapMarker = marker([latitude, longitude], { icon: markerIcon });
    this.mapMarker.addTo(this.mapObject);
  }

  resetExperiment() {
    this.setState(initialState);
    this.componentWillUnmount();
  }

  render() {
    const { isSupported, didRequest, isLoading, hasErrored } = this.state;

    if (!isSupported) return <NotSupported />;

    if (!didRequest) {
      return (
        <GeolocationCallToAction
          handleClick={this.requestGeolocation}
        />
      );
    }

    if (isLoading) return <Loading />;

    if (hasErrored) {
      return (
        <GeolocationError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    return (
      <div
        className="experiment__playground__content--stretched"
      >
        <div
          ref={(div) => { this.mapElement = div; }}
        >
        </div>
      </div>
    );
  }
}

export default Geolocation;
