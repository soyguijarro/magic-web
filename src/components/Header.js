import React from 'react';
import { Link } from 'react-router';
import Icon from './Icon';
import { APP, EXPERIMENT_IDS_BY_ORDER } from '../constants';

const Header = ({ experimentId }) => {
  const currentIndex = EXPERIMENT_IDS_BY_ORDER.indexOf(experimentId);
  const lastIndex = EXPERIMENT_IDS_BY_ORDER.length;
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  const previousExperimentUrl = previousIndex >= 0 ? EXPERIMENT_IDS_BY_ORDER[previousIndex] : null;
  const nextExperimentUrl = nextIndex <= lastIndex ? EXPERIMENT_IDS_BY_ORDER[nextIndex] : null;

  return (
    <header
      className="header"
    >
      <div
        className="header__title"
      >
        {APP.name}
      </div>

      <div
        className="header__controls"
      >
        <Link
          className={`header__controls__item${previousExperimentUrl ? '' : '--disabled'}`}
          to={`/magic-web/${previousExperimentUrl}`}
        >
          <Icon
            name="arrow_back"
          />
        </Link>
        <Link
          className={`header__controls__item${nextExperimentUrl ? '' : '--disabled'}`}
          to={`/magic-web/${nextExperimentUrl}`}
        >
          <Icon
            name="arrow_forward"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
