export const isGamepadSupported = 'getGamepads' in navigator;

const X_AXIS_VALUES = {
  1: 'RIGHT',
  '-1': 'LEFT',
};

const Y_AXIS_VALUES = {
  1: 'DOWN',
  '-1': 'UP',
};

const getGamepad = index => navigator.getGamepads()[index];

export const connectToGamepad = () => (
  new Promise((resolve, reject) => {
    const gamepad = getGamepad(0);
    if (gamepad) return resolve(gamepad);

    const timeoutId = setTimeout(reject, 5000);
    window.addEventListener('gamepadconnected', ({ gamepad }) => {
      clearTimeout(timeoutId);
      resolve(gamepad);
    });
  })
);

export const subscribeToGamepadDisconnection = (handleEvent) => {
  window.addEventListener('gamepaddisconnected', handleEvent);
};

export const getGamepadPressedButtonIndex = gamepadIndex => {
  const index = getGamepad(gamepadIndex).buttons.findIndex(button => button.pressed || button === 1.0);
  return index !== -1 ? index : null;
};

export const getGamepadAxisDirectionPressed = gamepadIndex => {
  const [x, y] = getGamepad(gamepadIndex).axes;
  return X_AXIS_VALUES[x] || Y_AXIS_VALUES[y] || null;
};
