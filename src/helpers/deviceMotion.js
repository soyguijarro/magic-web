let handleAccelerationChange = null;

const handleDeviceMotion = handleChange => (event) => {
  handleChange(event.accelerationIncludingGravity);
};

export const startListeningToAcceleration = (handleChange) => {
  handleAccelerationChange = handleDeviceMotion(handleChange);
  window.addEventListener('devicemotion', handleAccelerationChange);
};

export const stopListeningToAcceleration = () => {
  window.removeEventListener('devicemotion', handleAccelerationChange);
};
