import React, { RefObject, createRef, useEffect } from 'react'

import { WheelCanvasStyle } from './styles'
import { WheelData } from '../Wheel/types'

interface WheelCanvasProps extends DrawWheelProps {
  width: string
  height: string
  data: WheelData[]
}

interface DrawWheelProps {
  borderColor: string
  radiusColor: string
  borderWidth: number
  radiusWidth: number
  fontSize: number
}

const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: WheelData[],
  drawWheelProps: DrawWheelProps,
) => {
  const QUANTITY = data.length
  const {
    borderColor,
    radiusColor,
    borderWidth,
    radiusWidth,
    fontSize,
  } = drawWheelProps

  var canvas = canvasRef.current
  if (canvas?.getContext('2d')) {
    var ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, 500, 500)
    ctx.strokeStyle = 'transparent'
    ctx.lineWidth = 0

    var arc = Math.PI / (QUANTITY / 2)
    var startAngle = 0
    var outsideRadius = canvas.width / 2 - 10
    var textRadius = canvas.width / 3
    var insideRadius = 0
    var centerX = canvas.width / 2
    var centerY = canvas.height / 2

    ctx.font = `bold ${fontSize}px Helvetica, Arial`

    for (var i = 0; i < data.length; i++) {
      var angle = startAngle + i * arc
      const { style } = data[i]
      ctx.fillStyle = (style && style.backgroundColor) as string

      ctx.beginPath()
      ctx.arc(centerX, centerY, outsideRadius, angle, angle + arc, false)
      ctx.arc(centerX, centerY, insideRadius, angle + arc, angle, true)
      ctx.stroke()
      ctx.fill()

      ctx.save()

      ctx.fillStyle = (style && style.textColor) as string
      ctx.translate(
        centerX + Math.cos(angle + arc / 2) * textRadius,
        centerY + Math.sin(angle + arc / 2) * textRadius,
      )
      ctx.rotate(angle + arc / 2)
      var text = data[i].option
      ctx.fillText(text, -ctx.measureText(text).width / 2, fontSize / 2.7)
      ctx.restore()
    }

    // WHEEL RADIUS LINES
    ctx.strokeStyle = radiusColor
    ctx.lineWidth = radiusWidth
    for (var j = 0; j < data.length; j++) {
      var radiusAngle = startAngle + j * arc
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + (outsideRadius - 1) * Math.cos(radiusAngle),
        centerY + (outsideRadius - 1) * Math.sin(radiusAngle),
      )
      ctx.closePath()
      ctx.stroke()
    }

    // WHEEL BORDER
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth
    ctx.beginPath()
    ctx.arc(
      centerX,
      centerY,
      outsideRadius - ctx.lineWidth / 2 + 2,
      0,
      2 * Math.PI,
    )
    ctx.stroke()
  }
}

const WheelCanvas = ({
  width,
  height,
  data,
  borderColor,
  radiusColor,
  borderWidth,
  radiusWidth,
  fontSize,
}: WheelCanvasProps) => {
  const canvasRef = createRef<HTMLCanvasElement>()
  const drawWheelProps = {
    borderColor,
    radiusColor,
    borderWidth,
    radiusWidth,
    fontSize,
  }

  useEffect(() => {
    drawWheel(canvasRef, data, drawWheelProps)
  }, [canvasRef, data, drawWheelProps])

  return <WheelCanvasStyle ref={canvasRef} width={width} height={height} />
}

export default WheelCanvas
