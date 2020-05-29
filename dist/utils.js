export var getRotationDegrees = function (prizeNumber, numberOfPrizes) {
    var degreesPerPrize = 360 / numberOfPrizes;
    console.log('degreesPerPrize', degreesPerPrize);
    var initialRotation = 43 + degreesPerPrize / 2;
    console.log('initialRotation', initialRotation);
    var randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;
    var prizeRotation = degreesPerPrize * (numberOfPrizes - prizeNumber) -
        initialRotation +
        randomDifference;
    console.log('prizeRotation', prizeRotation);
    return numberOfPrizes - prizeNumber > numberOfPrizes / 2
        ? -360 + prizeRotation
        : prizeRotation;
};
export var clamp = function (min, max, val) {
    return Math.min(Math.max(min, +val), max);
};
