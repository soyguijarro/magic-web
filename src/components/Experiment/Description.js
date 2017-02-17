import React from 'react';
import Icon from './../Icon';
import { isWebShareSupported, sharePage } from '../../helpers/share';
import { APP } from '../../constants';

const Description = ({ title, description, apis }) => {
  const handleShareClick = () => {
    sharePage(`${APP.name}: ${title}`, document.URL);
  }

  return (
    <section
      className="experiment__description"
    >
      <div
        className="experiment__description__top"
      >
        <div>
          <h1
            className="experiment__description__top__title"
          >
            {title}
          </h1>
          <h2
            className="experiment__description__top__subtitle"
          >
            {apis}
          </h2>
        </div>

        { isWebShareSupported &&
          <span
            className="experiment__description__top__button"
            onClick={handleShareClick}
          >
            <Icon
              name="share"
            />
          </span>
        }
      </div>

      <p
        className="experiment__description__text"
      >
        {description}
      </p>
    </section>
  );
};

export default Description;
