const getRandomNumber = (minVal, maxVal) => (
  Math.floor(Math.random() * (maxVal - (minVal + 1))) + minVal
);

export default () => [
  getRandomNumber(0, 255),
  getRandomNumber(0, 255),
  getRandomNumber(0, 255)
];
