import { APP } from '../constants';

export const isWebShareSupported = 'share' in navigator;

export const sharePage = (title, url) => {
  navigator.share({
    title,
    text: APP.description,
    url
  });
}
