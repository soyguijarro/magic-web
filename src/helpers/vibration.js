export const isVibrationSupported = 'vibrate' in navigator;

export const vibrate = () => {
  navigator.vibrate([100, 50, 100]);
}
