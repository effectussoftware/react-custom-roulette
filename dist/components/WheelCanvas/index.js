import React, { createRef, useEffect } from 'react';
import { WheelCanvasStyle } from './styles';
import { clamp, getQuantity } from '../../utils';
const drawRadialBorder = (ctx, centerX, centerY, insideRadius, outsideRadius, angle) => {
    ctx.beginPath();
    ctx.moveTo(centerX + (insideRadius + 1) * Math.cos(angle), centerY + (insideRadius + 1) * Math.sin(angle));
    ctx.lineTo(centerX + (outsideRadius - 1) * Math.cos(angle), centerY + (outsideRadius - 1) * Math.sin(angle));
    ctx.closePath();
    ctx.stroke();
};
const drawWheel = (canvasRef, data, drawWheelProps) => {
    var _a, _b, _c, _d, _e;
    /* eslint-disable prefer-const */
    let { outerBorderColor, outerBorderWidth, innerRadius, innerBorderColor, innerBorderWidth, radiusLineColor, radiusLineWidth, fontFamily, fontWeight, fontSize, fontStyle, perpendicularText, prizeMap, textDistance, } = drawWheelProps;
    const QUANTITY = getQuantity(prizeMap);
    outerBorderWidth *= 2;
    innerBorderWidth *= 2;
    radiusLineWidth *= 2;
    const canvas = canvasRef.current;
    if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d')) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = 'transparent';
        ctx.lineWidth = 0;
        let startAngle = 0;
        const outsideRadius = canvas.width / 2 - 10;
        const clampedContentDistance = clamp(0, 100, textDistance);
        const contentRadius = (outsideRadius * clampedContentDistance) / 100;
        const clampedInsideRadius = clamp(0, 100, innerRadius);
        const insideRadius = (outsideRadius * clampedInsideRadius) / 100;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        for (let i = 0; i < data.length; i++) {
            const { optionSize, style } = data[i];
            const arc = (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
                (2 * Math.PI) / QUANTITY;
            const endAngle = startAngle + arc;
            ctx.fillStyle = (style && style.backgroundColor);
            ctx.beginPath();
            ctx.arc(centerX, centerY, outsideRadius, startAngle, endAngle, false);
            ctx.arc(centerX, centerY, insideRadius, endAngle, startAngle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            // WHEEL RADIUS LINES
            ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
            ctx.lineWidth = radiusLineWidth;
            drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, startAngle);
            if (i === data.length - 1) {
                drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, endAngle);
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
            // CONTENT FILL
            ctx.translate(centerX + Math.cos(startAngle + arc / 2) * contentRadius, centerY + Math.sin(startAngle + arc / 2) * contentRadius);
            let contentRotationAngle = startAngle + arc / 2;
            if (data[i].image) {
                // CASE IMAGE
                contentRotationAngle +=
                    data[i].image && !((_a = data[i].image) === null || _a === void 0 ? void 0 : _a.landscape) ? Math.PI / 2 : 0;
                ctx.rotate(contentRotationAngle);
                const img = ((_b = data[i].image) === null || _b === void 0 ? void 0 : _b._imageHTML) || new Image();
                ctx.drawImage(img, (img.width + (((_c = data[i].image) === null || _c === void 0 ? void 0 : _c.offsetX) || 0)) / -2, -(img.height -
                    (((_d = data[i].image) === null || _d === void 0 ? void 0 : _d.landscape) ? 0 : 90) + // offsetY correction for non landscape images
                    (((_e = data[i].image) === null || _e === void 0 ? void 0 : _e.offsetY) || 0)) / 2, img.width, img.height);
            }
            else {
                // CASE TEXT
                contentRotationAngle += perpendicularText ? Math.PI / 2 : 0;
                ctx.rotate(contentRotationAngle);
                const text = data[i].option;
                ctx.font = `${(style === null || style === void 0 ? void 0 : style.fontStyle) || fontStyle} ${(style === null || style === void 0 ? void 0 : style.fontWeight) || fontWeight} ${((style === null || style === void 0 ? void 0 : style.fontSize) || fontSize) * 2}px ${(style === null || style === void 0 ? void 0 : style.fontFamily) || fontFamily}, Helvetica, Arial`;
                ctx.fillStyle = (style && style.textColor);
                ctx.fillText(text || '', -ctx.measureText(text || '').width / 2, fontSize / 2.7);
            }
            ctx.restore();
            startAngle = endAngle;
        }
    }
};
const WheelCanvas = ({ width, height, data, outerBorderColor, outerBorderWidth, innerRadius, innerBorderColor, innerBorderWidth, radiusLineColor, radiusLineWidth, fontFamily, fontWeight, fontSize, fontStyle, perpendicularText, prizeMap, rouletteUpdater, textDistance, }) => {
    const canvasRef = createRef();
    const drawWheelProps = {
        outerBorderColor,
        outerBorderWidth,
        innerRadius,
        innerBorderColor,
        innerBorderWidth,
        radiusLineColor,
        radiusLineWidth,
        fontFamily,
        fontWeight,
        fontSize,
        fontStyle,
        perpendicularText,
        prizeMap,
        rouletteUpdater,
        textDistance,
    };
    useEffect(() => {
        drawWheel(canvasRef, data, drawWheelProps);
    }, [canvasRef, data, drawWheelProps, rouletteUpdater]);
    return React.createElement(WheelCanvasStyle, { ref: canvasRef, width: width, height: height });
};
export default WheelCanvas;
