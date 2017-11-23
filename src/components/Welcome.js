import React from 'react';
import { Link } from 'react-router';
import { EXPERIMENT_IDS_BY_ORDER } from '../constants';
import appIconUrl from '../images/icon.png';

const CHROME_CANARY_ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.chrome.canary';

const Welcome = () => (
  <div
    className="welcome"
  >
    <img
      role="presentation"
      className="welcome__icon"
      src={appIconUrl}
    />
    <h1
      className="welcome__title"
    >
      Magic Web
    </h1>
    <h2
      className="welcome__subtitle"
    >
      Discover all the amazing things your browser can do
    </h2>
    <p
      className="welcome__text"
    >
      For the most complete experience, use <a href={CHROME_CANARY_ANDROID_URL}>
      Chrome Canary for Android</a> with the Experimental Web Platform features
      flag. Some demos might not work in other browsers and platforms.
    </p>
    <p
      className="welcome__text"
    >
      Ready to be amazed?
    </p>
    <Link
      className="welcome__button"
      to={`/magic-web/${EXPERIMENT_IDS_BY_ORDER[0]}`}
    >
      Get started
    </Link>
  </div>
);

export default Welcome;
