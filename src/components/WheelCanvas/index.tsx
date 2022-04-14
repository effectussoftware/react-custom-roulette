import React, { createRef, RefObject, useEffect } from 'react';

import { WheelCanvasStyle } from './styles';
import { WheelData } from '../Wheel/types';
import { clamp, getQuantity } from '../../utils';

interface WheelCanvasProps extends DrawWheelProps {
  width: string;
  height: string;
  data: WheelData[];
}

interface DrawWheelProps {
  outerBorderColor: string;
  outerBorderWidth: number;
  innerRadius: number;
  innerBorderColor: string;
  innerBorderWidth: number;
  radiusLineColor: string;
  radiusLineWidth: number;
  fontFamily: string;
  fontUpdater: boolean;
  fontSize: number;
  perpendicularText: boolean;
  prizeMap: number[][];
  textDistance: number;
}

const drawRadialBorder = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  insideRadius: number,
  outsideRadius: number,
  angle: number
) => {
  ctx.beginPath();
  ctx.moveTo(
    centerX + (insideRadius + 1) * Math.cos(angle),
    centerY + (insideRadius + 1) * Math.sin(angle)
  );
  ctx.lineTo(
    centerX + (outsideRadius - 1) * Math.cos(angle),
    centerY + (outsideRadius - 1) * Math.sin(angle)
  );
  ctx.closePath();
  ctx.stroke();
};

const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: WheelData[],
  drawWheelProps: DrawWheelProps
) => {
  /* eslint-disable prefer-const */
  let {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontFamily,
    fontSize,
    perpendicularText,
    prizeMap,
    textDistance,
  } = drawWheelProps;

  const QUANTITY = getQuantity(prizeMap);

  outerBorderWidth *= 2;
  innerBorderWidth *= 2;
  radiusLineWidth *= 2;

  const canvas = canvasRef.current;
  if (canvas?.getContext('2d')) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;

    let startAngle = 0;
    const outsideRadius = canvas.width / 2 - 10;

    const clampedTextDistance = clamp(0, 100, textDistance);
    const textRadius = (outsideRadius * clampedTextDistance) / 100;

    const clampedInsideRadius = clamp(0, 100, innerRadius);
    const insideRadius = (outsideRadius * clampedInsideRadius) / 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.font = `bold ${fontSize}px Helvetica, Arial`;
    for (let i = 0; i < data.length; i++) {
      const { optionSize, style } = data[i];

      const arc =
        (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
        (2 * Math.PI) / QUANTITY;
      const endAngle = startAngle + arc;

      ctx.fillStyle = (style && style.backgroundColor) as string;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outsideRadius, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, insideRadius, endAngle, startAngle, true);
      ctx.stroke();
      ctx.fill();
      ctx.save();

      // WHEEL RADIUS LINES
      ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
      ctx.lineWidth = radiusLineWidth;
      drawRadialBorder(
        ctx,
        centerX,
        centerY,
        insideRadius,
        outsideRadius,
        startAngle
      );
      if (i === data.length - 1) {
        drawRadialBorder(
          ctx,
          centerX,
          centerY,
          insideRadius,
          outsideRadius,
          endAngle
        );
      }

      // WHEEL OUTER BORDER
      ctx.strokeStyle =
        outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
      ctx.lineWidth = outerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outsideRadius - ctx.lineWidth / 2,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // WHEEL INNER BORDER
      ctx.strokeStyle =
        innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
      ctx.lineWidth = innerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        insideRadius + ctx.lineWidth / 2 - 1,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // TEXT FILL
      ctx.font = `bold ${(style?.fontSize || fontSize) * 2}px ${
        style?.fontFamily || fontFamily
      }, Helvetica, Arial`;
      ctx.fillStyle = (style && style.textColor) as string;
      ctx.translate(
        centerX + Math.cos(startAngle + arc / 2) * textRadius,
        centerY + Math.sin(startAngle + arc / 2) * textRadius
      );
      const text = data[i].option;
      const textRotationAngle = perpendicularText
        ? startAngle + arc / 2 + Math.PI / 2
        : startAngle + arc / 2;
      ctx.rotate(textRotationAngle);
      ctx.fillText(text, -ctx.measureText(text).width / 2, fontSize / 2.7);
      ctx.restore();

      startAngle = endAngle;
    }
  }
};

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
  fontFamily,
  fontUpdater,
  fontSize,
  perpendicularText,
  prizeMap,
  textDistance,
}: WheelCanvasProps): JSX.Element => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const drawWheelProps = {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontFamily,
    fontUpdater,
    fontSize,
    perpendicularText,
    prizeMap,
    textDistance,
  };

  useEffect(() => {
    drawWheel(canvasRef, data, drawWheelProps);
  }, [canvasRef, data, drawWheelProps, fontUpdater]);

  return <WheelCanvasStyle ref={canvasRef} width={width} height={height} />;
};

export default WheelCanvas;
