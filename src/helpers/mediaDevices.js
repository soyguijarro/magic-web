export const isMediaDevicesSupported = 'mediaDevices' in navigator &&
  'enumerateDevices' in navigator.mediaDevices;

export const getVideoDevices = () => (
  navigator.mediaDevices.enumerateDevices()
    .then(devices => devices.filter(device => device.kind === 'videoinput'))
);

export const getMediaDeviceStream = (deviceId) => (
  navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: { exact: deviceId }
    }
  })
);

export const stopMediaDeviceStream = (stream) => {
  const videoTracks = stream.getVideoTracks();
  videoTracks[0].stop();
};

export const takeVideoSnap = (stream, videoElement) => {
  if ('ImageCapture' in window) {
    const videoTracks = stream.getVideoTracks();
    const imageCapture = new window.ImageCapture(videoTracks[0]);
    return imageCapture.takePhoto().then(URL.createObjectURL);
  }

  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth * 0.25;
  canvas.height = videoElement.videoHeight * 0.25;
  const context = canvas.getContext('2d');
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  return Promise.resolve(canvas.toDataURL('image/jpg'));
};
