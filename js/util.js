export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const createIdGenerator = () => {
  let currentValue = 0;
  return function() {
    currentValue += 1;
    return currentValue;
  };
};

export const getRandomElement = (someArray) =>
  someArray[getRandomInteger(0, someArray.length - 1)];

export const randomSort = () => Math.random() - 0.5;

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
