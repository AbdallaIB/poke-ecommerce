export const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';

export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
