export var getRotationDegrees = function (prizeNumber, numberOfPrizes, randomDif) {
    if (randomDif === void 0) { randomDif = true; }
    var degreesPerPrize = 360 / numberOfPrizes;
    var initialRotation = 43 + degreesPerPrize / 2;
    var randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;
    var prizeRotation = randomDif
        ? degreesPerPrize * (numberOfPrizes - prizeNumber) -
            initialRotation +
            randomDifference
        : degreesPerPrize * (numberOfPrizes - prizeNumber) - initialRotation;
    return numberOfPrizes - prizeNumber > numberOfPrizes / 2
        ? -360 + prizeRotation
        : prizeRotation;
};
export var clamp = function (min, max, val) {
    return Math.min(Math.max(min, +val), max);
};
export var getQuantity = function (prizeMap) {
    return prizeMap.slice(-1)[0].slice(-1)[0] + 1;
};
