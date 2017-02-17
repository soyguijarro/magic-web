import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/index.css';

const router = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
