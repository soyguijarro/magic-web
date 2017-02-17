import React from 'react';
import Description from './Description';

const Experiment = ({ descriptionTexts, playgroundComponent }) => (
  <main
    className="experiment"
  >
    <Description
      {...descriptionTexts}
    />

    <section
      className="experiment__playground"
    >
      {playgroundComponent}
    </section>
  </main>
);

export default Experiment;
