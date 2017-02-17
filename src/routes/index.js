import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Welcome from '../components/Welcome';
import App from '../components/App';
import getExperiment from './getExperiment';
import { EXPERIMENT_IDS_BY_ORDER } from '../constants';

const experimentRoutes = EXPERIMENT_IDS_BY_ORDER.map(id => (
  <Route key={id} path={id} component={getExperiment(id)} />
));

export default (
  <Route path="/magic-web">
    <IndexRoute component={Welcome} />
    <Route path="" component={App}>
      {experimentRoutes}
    </Route>
    <Route path="*">
      <IndexRedirect to="/magic-web" />
    </Route>
  </Route>
);
