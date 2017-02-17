import React from 'react';
import ToUpperCamelCase from '../utils/ToUpperCamelCase';
import { EXPERIMENT_IDS_BY_ORDER } from '../constants';

const playgroundComponents = EXPERIMENT_IDS_BY_ORDER
  .reduce((prevObj, id) => ({
    ...prevObj,
    [id]: require(`../components/Experiment/Playground/${ToUpperCamelCase(id)}/index`).default
  }), {});

const getPlayground = id => {
  const Playground = playgroundComponents[id];

  return <Playground />;
};

export default getPlayground;
