export const isGeolocationSupported = 'geolocation' in navigator;

export const requestGeolocation = (handleSuccess, handleFailure) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000
  };

  return navigator.geolocation.watchPosition(
    ({ coords }) => handleSuccess(coords.latitude, coords.longitude),
    handleFailure,
    options
  );
};

export const stopGeolocation = (watchId) => {
  navigator.geolocation.clearWatch(watchId);
};
