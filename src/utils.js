export const getRotationDegrees = (prizeNumber, numberOfPrizes) => {
  const degreesPerPrize = 360 / numberOfPrizes
  console.log('degreesPerPrize', degreesPerPrize)

  const initialRotation = 43 + degreesPerPrize / 2
  console.log('initialRotation', initialRotation)

  const randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35

  const prizeRotation =
    degreesPerPrize * (numberOfPrizes - prizeNumber) -
    initialRotation +
    randomDifference
  console.log('prizeRotation', prizeRotation)

  return numberOfPrizes - prizeNumber > numberOfPrizes / 2
    ? -360 + prizeRotation
    : prizeRotation
}

export const drawWheel = (canvasRef, data, values) => {
  const QUANTITY = data.length

  var canvas = canvasRef.current
  var ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 500, 500)
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2
  var arc = Math.PI / (QUANTITY / 2)
  var startAngle = 0
  var outsideRadius = canvas.width / 2
  var textRadius = canvas.width / 3.5
  var insideRadius = 0
  var myTotal = 0 // Automatically calculated so don't touch
  ctx.font = 'bold 50px Helvetica, Arial'
  for (var e = 0; e < data.length; e++) {
    myTotal += data[e]
  }
  for (var i = 0; i < data.length; i++) {
    var angle = startAngle + i * arc
    ctx.fillStyle = data[i].color

    ctx.beginPath()
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      outsideRadius,
      angle,
      angle + arc,
      false,
    )
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      insideRadius,
      angle + arc,
      angle,
      true,
    )
    ctx.stroke()
    ctx.fill()

    ctx.save()
    ctx.shadowOffsetX = -1
    ctx.shadowOffsetY = -1
    ctx.shadowBlur = 0
    ctx.shadowColor = 'rgb(220,220,220)'
    ctx.fillStyle = 'black'
    ctx.translate(
      canvas.width / 2 + Math.cos(angle + arc / 2) * textRadius,
      canvas.height / 2 + Math.sin(angle + arc / 2) * textRadius,
    )
    ctx.rotate(angle + arc / 2)
    var text = data[i].option
    ctx.fillText(text, -ctx.measureText(text).width / 2, 15)
    ctx.restore()
  }
}
