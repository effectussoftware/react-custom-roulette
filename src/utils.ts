export const getRotationDegrees = (
  prizeNumber: number,
  numberOfPrizes: number
) => {
  const degreesPerPrize = 360 / numberOfPrizes;

  const initialRotation = 43 + degreesPerPrize / 2;

  const randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;

  const prizeRotation =
    degreesPerPrize * (numberOfPrizes - prizeNumber) -
    initialRotation +
    randomDifference;

  return numberOfPrizes - prizeNumber > numberOfPrizes / 2
    ? -360 + prizeRotation
    : prizeRotation;
};

export const clamp = (min: number, max: number, val: number) =>
  Math.min(Math.max(min, +val), max);

export const getQuantity = (prizeMap: number[][]) =>
  prizeMap.slice(-1)[0].slice(-1)[0] + 1;

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const makeClassKey = (length: number) => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
