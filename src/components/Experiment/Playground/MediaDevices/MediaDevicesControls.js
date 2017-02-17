import React from 'react';
import Icon from '../../../Icon';

const MediaDevicesControls = ({ snaps, areMultipleVideoDevices, handleVideoDeviceChange }) => (
  <div
    className="experiment__playground__content__video__controls"
  >
    <div
      className="experiment__playground__content__video__controls__strip"
    >
      {
        snaps && snaps.map((snap, index) => (
          <img
            className="experiment__playground__content__video__controls__strip__item"
            alt={`Snap ${index}`}
            key={index}
            src={snap}
          />
        ))
      }
    </div>
    {areMultipleVideoDevices &&
      <button
        className="experiment__playground__content__button"
        onClick={handleVideoDeviceChange}
      >
        <Icon
          name="switch_camera"
        />
      </button>
    }
  </div>
);

export default MediaDevicesControls;
