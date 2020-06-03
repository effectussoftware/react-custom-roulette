import React, { createRef, useEffect } from 'react';
import { WheelCanvasStyle } from './styles';
import { clamp } from '../../utils';
var drawWheel = function (canvasRef, data, drawWheelProps) {
    var QUANTITY = data.length;
    /* eslint-disable prefer-const */
    var outerBorderColor = drawWheelProps.outerBorderColor, outerBorderWidth = drawWheelProps.outerBorderWidth, innerRadius = drawWheelProps.innerRadius, innerBorderColor = drawWheelProps.innerBorderColor, innerBorderWidth = drawWheelProps.innerBorderWidth, radiusLineColor = drawWheelProps.radiusLineColor, radiusLineWidth = drawWheelProps.radiusLineWidth, fontSize = drawWheelProps.fontSize, perpendicularText = drawWheelProps.perpendicularText, textDistance = drawWheelProps.textDistance;
    /* eslint-enable prefer-const */
    outerBorderWidth *= 2;
    innerBorderWidth *= 2;
    radiusLineWidth *= 2;
    fontSize *= 2;
    var canvas = canvasRef.current;
    if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d')) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = 'transparent';
        ctx.lineWidth = 0;
        // ctx.translate(0.5, 0.5)
        var arc = Math.PI / (QUANTITY / 2);
        var startAngle = 0;
        var outsideRadius = canvas.width / 2 - 10;
        var clampedTextDistance = clamp(0, 100, textDistance);
        var textRadius = (outsideRadius * clampedTextDistance) / 100;
        var clampedInsideRadius = clamp(0, 100, innerRadius);
        var insideRadius = (outsideRadius * clampedInsideRadius) / 100;
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        ctx.font = "bold " + fontSize + "px Helvetica, Arial";
        for (var i = 0; i < data.length; i++) {
            var angle = startAngle + i * arc;
            var style = data[i].style;
            ctx.fillStyle = (style && style.backgroundColor);
            ctx.beginPath();
            ctx.arc(centerX, centerY, outsideRadius, angle, angle + arc, false);
            ctx.arc(centerX, centerY, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            // WHEEL RADIUS LINES
            ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
            ctx.lineWidth = radiusLineWidth;
            for (var j = 0; j < data.length; j++) {
                var radiusAngle = startAngle + j * arc;
                ctx.beginPath();
                ctx.moveTo(centerX + (insideRadius + 1) * Math.cos(radiusAngle), centerY + (insideRadius + 1) * Math.sin(radiusAngle));
                ctx.lineTo(centerX + (outsideRadius - 1) * Math.cos(radiusAngle), centerY + (outsideRadius - 1) * Math.sin(radiusAngle));
                ctx.closePath();
                ctx.stroke();
            }
            // WHEEL OUTER BORDER
            ctx.strokeStyle =
                outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
            ctx.lineWidth = outerBorderWidth;
            ctx.beginPath();
            ctx.arc(centerX, centerY, outsideRadius - ctx.lineWidth / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            // WHEEL INNER BORDER
            ctx.strokeStyle =
                innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
            ctx.lineWidth = innerBorderWidth;
            ctx.beginPath();
            ctx.arc(centerX, centerY, insideRadius + ctx.lineWidth / 2 - 1, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            // TEXT FILL
            ctx.fillStyle = (style && style.textColor);
            ctx.translate(centerX + Math.cos(angle + arc / 2) * textRadius, centerY + Math.sin(angle + arc / 2) * textRadius);
            var text = data[i].option;
            var textRotationAngle = perpendicularText
                ? angle + arc / 2 + Math.PI / 2
                : angle + arc / 2;
            ctx.rotate(textRotationAngle);
            ctx.fillText(text, -ctx.measureText(text).width / 2, fontSize / 2.7);
            ctx.restore();
        }
    }
};
var WheelCanvas = function (_a) {
    var width = _a.width, height = _a.height, data = _a.data, outerBorderColor = _a.outerBorderColor, outerBorderWidth = _a.outerBorderWidth, innerRadius = _a.innerRadius, innerBorderColor = _a.innerBorderColor, innerBorderWidth = _a.innerBorderWidth, radiusLineColor = _a.radiusLineColor, radiusLineWidth = _a.radiusLineWidth, fontSize = _a.fontSize, perpendicularText = _a.perpendicularText, textDistance = _a.textDistance;
    var canvasRef = createRef();
    var drawWheelProps = {
        outerBorderColor: outerBorderColor,
        outerBorderWidth: outerBorderWidth,
        innerRadius: innerRadius,
        innerBorderColor: innerBorderColor,
        innerBorderWidth: innerBorderWidth,
        radiusLineColor: radiusLineColor,
        radiusLineWidth: radiusLineWidth,
        fontSize: fontSize,
        perpendicularText: perpendicularText,
        textDistance: textDistance,
    };
    useEffect(function () {
        drawWheel(canvasRef, data, drawWheelProps);
    }, [canvasRef, data, drawWheelProps]);
    return React.createElement(WheelCanvasStyle, { ref: canvasRef, width: width, height: height });
};
export default WheelCanvas;
