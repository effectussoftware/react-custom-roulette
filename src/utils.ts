import { WEB_FONTS } from './strings';

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

export const isCustomFont = (font: string) =>
  !WEB_FONTS.includes(font.toLowerCase());
