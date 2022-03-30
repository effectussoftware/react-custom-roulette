export const getRotationDegrees = (
  prizeNumber: number,
  numberOfPrizes: number,
  randomDif = true
) => {
  const degreesPerPrize = 360 / numberOfPrizes;

  const initialRotation = 43 + degreesPerPrize / 2;

  const randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;

  const prizeRotation = randomDif
    ? degreesPerPrize * (numberOfPrizes - prizeNumber) -
      initialRotation +
      randomDifference
    : degreesPerPrize * (numberOfPrizes - prizeNumber) - initialRotation;

  return numberOfPrizes - prizeNumber > numberOfPrizes / 2
    ? -360 + prizeRotation
    : prizeRotation;
};

export const clamp = (min: number, max: number, val: number) =>
  Math.min(Math.max(min, +val), max);

export const getQuantity = (prizeMap: number[][]) =>
  prizeMap.slice(-1)[0].slice(-1)[0] + 1;
