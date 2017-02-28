export const APP = {
  name: 'Magic Web',
  description: 'Discover all the amazing things your browser can do'
};

export const EXPERIMENTS_TEXTS = {
  geolocation: {
    title: 'Where are you?',
    description: 'Websites can use GPS and network info to get your position. Tap below for a quick demo, then move around to see how it updates.',
    apis: 'Geolocation API'
  },
  payment: {
    title: 'Show me the money',
    description: 'Browsers can now display native UIs to collect payment and shipping data. Tap below to try it. Don\'t worry, we won\'t actually charge you.',
    apis: 'Payment Request API'
  },
  'media-devices': {
    title: 'Say cheese!',
    description: 'Browsers can capture video and photos with no plugins. Tap below and then on the video to grab a snap. You can also switch between cameras.',
    apis: 'MediaDevices API'
  },
  speech: {
    title: 'Listen and repeat',
    description: 'Websites can talk and listen in different languages. Select one below to check your skills with a little pronunciation test.',
    apis: 'Web Speech API'
  },
  bluetooth: {
    title: 'Lights up!',
    description: 'Websites can now interact with wireless devices. For this demo you\'ll need a Bluetooth light bulb. Try shaking your device after connecting.',
    apis: 'Web Bluetooth, DeviceMotion, Vibration APIs'
  },
  notifications: {
    title: 'Alive and pinging',
    description: 'Websites can now send rich, interactive notifications that integrate with the system, just like native apps do. Give it a spin below.',
    apis: 'Notifications, Service Workers APIs'
  },
  'shape-detection': {
    title: 'Anybody there?',
    description: 'Browsers can analyze pictures to detect various shapes. Tap below to take a photo or upload one. We\'ll tell you have many faces are in it.',
    apis: 'Shape Detection API'
  },
  'battery-network': {
    title: 'Pulling the plug',
    description: 'Browsers can read battery and network info. Tap below, then plug in your phone or change your connection to see what happens.',
    apis: 'Battery Status, Network Information, Vibration APIs'
  }
};

export const EXPERIMENT_IDS_BY_ORDER = [
  'geolocation',
  'media-devices',
  'battery-network',
  'notifications',
  'payment',
  'speech',
  'shape-detection',
  'bluetooth'
];

export const SPEECH_EXPERIMENT_DATA = {
  'es-ES': {
    language: 'Spanish',
    sentence: 'Los navegadores pueden ahora hablar y escuchar en muchos idiomas'
  },
  'fr-FR': {
    language: 'French',
    sentence: 'Les navigateurs peuvent maintenant parler et écouter dans beaucoup de langues'
  },
  'de-DE': {
    language: 'German',
    sentence: 'Browser können jetzt sprechen und hören in einer Menge von Sprachen'
  },
  'en-US': {
    language: 'English',
    sentence: 'Browsers can now talk and listen in a lot of languages'
  },
};

export const BLUETOOTH_EXPERIMENT_DATA = {
  LIGHT_BULB_SERVICE: 0xffe5,
  LIGHT_BULB_CHARACTERISTIC: 0xffe9
};
