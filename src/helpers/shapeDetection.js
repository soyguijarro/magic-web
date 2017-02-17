export const isFaceDetectionSupported = 'FaceDetector' in window;

export const getNumberOfFaces = (imgElement) => {
  const faceDetector = new window.FaceDetector();

  return faceDetector.detect(imgElement)
    .then(faces => faces.length);
}
