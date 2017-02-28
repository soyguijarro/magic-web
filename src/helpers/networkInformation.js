const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

export const isNetworkInformationSupported = !!connection;

export const getNetworkType = () => connection && connection.type;

let handleNetworkTypeChange = null;

const handleNetworkChange = handleChange => () => {
  handleChange(getNetworkType());
};

export const subscribeToNetworkChanges = (handleChange) => {
  if (!connection) return;

  handleNetworkTypeChange = handleNetworkChange(handleChange);
  connection.addEventListener('typechange', handleNetworkTypeChange);
};

export const unsubscribeFromNetworkChanges = () => {
  if (!connection) return;

  connection.removeEventListener('typechange', handleNetworkTypeChange);
};
