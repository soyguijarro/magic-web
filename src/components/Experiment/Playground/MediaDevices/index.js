import React, { PureComponent } from 'react';
import NotSupported from '../NotSupported';
import Loading from '../Loading';
import MediaDevicesCallToAction from './MediaDevicesCallToAction';
import MediaDevicesError from './MediaDevicesError';
import MediaDevicesControls from './MediaDevicesControls';
import {
  isMediaDevicesSupported, getVideoDevices, getMediaDeviceStream,
  stopMediaDeviceStream, takeVideoSnap
} from '../../../../helpers/mediaDevices';

const initialState = {
  isSupported: true,
  didRequest: false,
  isLoading: false,
  hasErrored: false,
  areMultipleVideoDevices: false,
  snaps: []
};

class MediaDevices extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.videoDevices = [];
    this.currentVideoDeviceIndex = 0;
    this.currentVideoStream = null;

    this.setVideoDevices = this.setVideoDevices.bind(this);
    this.setCurrentVideoDeviceStream = this.setCurrentVideoDeviceStream.bind(this);
    this.changeVideoDevice = this.changeVideoDevice.bind(this);
    this.takeVideoSnap = this.takeVideoSnap.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isMediaDevicesSupported) return this.setState({ isSupported: false });
  }

  componentWillUnmount() {
    if (this.currentVideoStream) stopMediaDeviceStream(this.currentVideoStream);
  }

  setVideoDevices() {
    return getVideoDevices()
      .then(videoDevices => {
        this.videoDevices = videoDevices;
        this.setState({ isLoading: true, hasErrored: false, areMultipleVideoDevices: videoDevices.length > 1 });
        return this.setCurrentVideoDeviceStream();
      })
      .catch(() => this.setState({ isLoading: false, hasErrored: true }));
  }

  setCurrentVideoDeviceStream() {
    if (this.currentVideoStream) stopMediaDeviceStream(this.currentVideoStream);

    const selectedVideoDevice = this.videoDevices[this.currentVideoDeviceIndex];
    return getMediaDeviceStream(selectedVideoDevice.deviceId)
      .then((stream) => {
        this.setState({ didRequest: true, isLoading: false }, () => {
          this.currentVideoStream = stream;
          this.videoElement.srcObject = stream;
        });
      });
  }

  changeVideoDevice() {
    this.currentVideoDeviceIndex =
      this.currentVideoDeviceIndex < this.videoDevices.length - 1 ?
      this.currentVideoDeviceIndex + 1 : 0;

    this.setCurrentVideoDeviceStream()
      .catch(() => this.setState({ hasErrored: true }));
  }

  takeVideoSnap() {
    if (!this.currentVideoStream) return;

    takeVideoSnap(this.currentVideoStream, this.videoElement)
      .then(newSnap => {
        this.setState(prevState => ({
          snaps: [newSnap, ...prevState.snaps]
        }));
      });
  }

  resetExperiment() {
    this.setState(initialState);
    this.componentWillUnmount();
  }

  render() {
    const { isSupported, didRequest, isLoading, hasErrored, areMultipleVideoDevices, snaps } = this.state;

    if (!isSupported) return <NotSupported />;

    if (isLoading) return <Loading />;

    if (hasErrored) {
      return (
        <MediaDevicesError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    if (!didRequest) {
      return (
        <MediaDevicesCallToAction
          handleClick={this.setVideoDevices}
        />
      );
    }

    return (
      <div
        className="experiment__playground__content--media-devices"
      >
        <video
          className="experiment__playground__content--media-devices__player"
          ref={(video) => { this.videoElement = video; }}
          autoPlay
          onClick={this.takeVideoSnap}
        />

        <MediaDevicesControls
          snaps={snaps}
          areMultipleVideoDevices={areMultipleVideoDevices}
          handleVideoDeviceChange={this.changeVideoDevice}
        />
      </div>
    );
  }
}

export default MediaDevices;
