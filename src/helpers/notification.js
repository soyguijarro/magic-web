import iconUrl from '../images/icon.png';

export const isServiceWorkerSupported = 'serviceWorker' in navigator;
export const isNotificationSupported = 'Notification' in window;

export const requestNotificationPermission = () => (
  window.Notification.requestPermission()
    .then((result) => {
      if (result !== 'granted') return Promise.reject();
      return navigator.serviceWorker.ready;
    })
);

export const showNotification = (registration) => {
  const options = {
    body: 'This is possible thanks to the Notifications API',
    icon: iconUrl,
    badge: iconUrl,
    vibrate: [200, 200],
    persistent: true
  };

  return registration.showNotification('Hello from Magic Web', options);
}
