import React from 'react';
import getPlayground from './getPlayground';
import Experiment from '../components/Experiment';
import { EXPERIMENTS_TEXTS } from '../constants';

const getExperiment = id => () => (
  <Experiment
    descriptionTexts={EXPERIMENTS_TEXTS[id]}
    playgroundComponent={getPlayground(id)}
  />
);

export default getExperiment;
