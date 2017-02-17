import React from 'react';
import Header from './Header';
import getLastChunkOfPath from '../utils/getLastChunkOfPath';

const App = ({ location, children }) => (
  <div
    className="app"
  >
    <Header
      experimentId={getLastChunkOfPath(location.pathname)}
    />

    {children}
  </div>
);

export default App;
