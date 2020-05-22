import React, { RefObject, createRef, useEffect } from "react";

import { WheelCanvasStyle } from "./styles";

const DEFAULT_BACKGROUND_COLOR = "white";
const DEFAULT_TEXT_COLOR = "black";

interface WheelData {
  option: string;
  style: {
    backgroundColor?: string;
    textColor?: string;
  };
}

const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: WheelData[]
) => {
  const QUANTITY = data.length;

  var canvas = canvasRef.current;
  if (canvas?.getContext("2d")) {
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    var arc = Math.PI / (QUANTITY / 2);
    var startAngle = 0;
    var outsideRadius = canvas.width / 2;
    var textRadius = canvas.width / 3;
    var insideRadius = 0;
    ctx.font = "bold 50px Helvetica, Arial";
    for (var i = 0; i < data.length; i++) {
      var angle = startAngle + i * arc;
      const {
        style: { backgroundColor, textColor },
      } = data[i];
      ctx.fillStyle = backgroundColor || DEFAULT_BACKGROUND_COLOR;

      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        outsideRadius,
        angle,
        angle + arc,
        false
      );
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        insideRadius,
        angle + arc,
        angle,
        true
      );
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "rgb(220,220,220)";

      ctx.fillStyle = textColor || DEFAULT_TEXT_COLOR;
      ctx.translate(
        canvas.width / 2 + Math.cos(angle + arc / 2) * textRadius,
        canvas.height / 2 + Math.sin(angle + arc / 2) * textRadius
      );
      ctx.rotate(angle + arc / 2);
      var text = data[i].option;
      ctx.fillText(text, -ctx.measureText(text).width / 2, 15);
      ctx.restore();
    }
  }
};

const WheelCanvas = ({
  width,
  height,
  data,
}: {
  width: string;
  height: string;
  data: WheelData[];
}) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    drawWheel(canvasRef, data);
  }, [canvasRef, data]);

  return <WheelCanvasStyle ref={canvasRef} width={width} height={height} />;
};

export default WheelCanvas;
