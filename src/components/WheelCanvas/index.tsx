import React, { RefObject, createRef, useEffect } from 'react'

import { WheelCanvasStyle } from './styles'
import { WheelData } from '../Wheel/types'
import { clamp } from '../../utils'

interface WheelCanvasProps extends DrawWheelProps {
  width: string
  height: string
  data: WheelData[]
}

interface DrawWheelProps {
  outerBorderColor: string
  outerBorderWidth: number
  innerRadius: number
  innerBorderColor: string
  innerBorderWidth: number
  radiusLineColor: string
  radiusLineWidth: number
  fontSize: number
  perpendicularText: boolean
  textDistance: number
}

const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: WheelData[],
  drawWheelProps: DrawWheelProps,
) => {
  const QUANTITY = data.length
  var {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontSize,
    perpendicularText,
    textDistance,
  } = drawWheelProps

  outerBorderWidth = outerBorderWidth * 2
  innerBorderWidth = innerBorderWidth * 2
  radiusLineWidth = radiusLineWidth * 2
  fontSize = fontSize * 2

  var canvas = canvasRef.current
  if (canvas?.getContext('2d')) {
    var ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, 500, 500)
    ctx.strokeStyle = 'transparent'
    ctx.lineWidth = 0
    // ctx.translate(0.5, 0.5)

    var arc = Math.PI / (QUANTITY / 2)
    var startAngle = 0
    var outsideRadius = canvas.width / 2 - 10

    var clampedTextDistance = clamp(0, 100, textDistance)
    var textRadius = (outsideRadius * clampedTextDistance) / 100

    var clampedInsideRadius = clamp(0, 100, innerRadius)
    var insideRadius = (outsideRadius * clampedInsideRadius) / 100

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

      // WHEEL RADIUS LINES
      ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor
      ctx.lineWidth = radiusLineWidth
      for (var j = 0; j < data.length; j++) {
        var radiusAngle = startAngle + j * arc
        ctx.beginPath()
        ctx.moveTo(
          centerX + (insideRadius + 1) * Math.cos(radiusAngle),
          centerY + (insideRadius + 1) * Math.sin(radiusAngle),
        )
        ctx.lineTo(
          centerX + (outsideRadius - 1) * Math.cos(radiusAngle),
          centerY + (outsideRadius - 1) * Math.sin(radiusAngle),
        )
        ctx.closePath()
        ctx.stroke()
      }

      // WHEEL OUTER BORDER
      ctx.strokeStyle = outerBorderWidth <= 0 ? 'transparent' : outerBorderColor
      ctx.lineWidth = outerBorderWidth
      ctx.beginPath()
      ctx.arc(
        centerX,
        centerY,
        outsideRadius - ctx.lineWidth / 2,
        0,
        2 * Math.PI,
      )
      ctx.closePath()
      ctx.stroke()

      // WHEEL INNER BORDER
      ctx.strokeStyle = innerBorderWidth <= 0 ? 'transparent' : innerBorderColor
      ctx.lineWidth = innerBorderWidth
      ctx.beginPath()
      ctx.arc(
        centerX,
        centerY,
        insideRadius + ctx.lineWidth / 2 - 1,
        0,
        2 * Math.PI,
      )
      ctx.closePath()
      ctx.stroke()

      // TEXT FILL
      ctx.fillStyle = (style && style.textColor) as string
      ctx.translate(
        centerX + Math.cos(angle + arc / 2) * textRadius,
        centerY + Math.sin(angle + arc / 2) * textRadius,
      )
      var text = data[i].option
      var textRotationAngle = perpendicularText
        ? angle + arc / 2 + Math.PI / 2
        : angle + arc / 2
      ctx.rotate(textRotationAngle)
      ctx.fillText(text, -ctx.measureText(text).width / 2, fontSize / 2.7)
      ctx.restore()
    }
  }
}

const WheelCanvas = ({
  width,
  height,
  data,
  outerBorderColor,
  outerBorderWidth,
  innerRadius,
  innerBorderColor,
  innerBorderWidth,
  radiusLineColor,
  radiusLineWidth,
  fontSize,
  perpendicularText,
  textDistance,
}: WheelCanvasProps) => {
  const canvasRef = createRef<HTMLCanvasElement>()
  const drawWheelProps = {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontSize,
    perpendicularText,
    textDistance,
  }

  useEffect(() => {
    drawWheel(canvasRef, data, drawWheelProps)
  }, [canvasRef, data, drawWheelProps])

  return <WheelCanvasStyle ref={canvasRef} width={width} height={height} />
}

export default WheelCanvas
