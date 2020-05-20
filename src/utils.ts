export const getRotationDegrees = (
  prizeNumber: number,
  numberOfPrizes: number,
) => {
  const degreesPerPrize = 360 / numberOfPrizes
  const randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.4
  const prizeRotation = degreesPerPrize * (prizeNumber + 1) + randomDifference

  return prizeNumber > 3 ? -360 + prizeRotation : prizeRotation
}
