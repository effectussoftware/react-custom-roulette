var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useEffect, useRef } from "react";
import { getRotationDegrees } from "../../utils";
import { rouletteSelector } from "../common/images";
import { RouletteContainer, RouletteSelectorImage, RotationContainer, } from "./styles";
import { DEFAULT_BACKGROUND_COLORS, DEFAULT_TEXT_COLORS, DEFAULT_OUTER_BORDER_COLOR, DEFAULT_OUTER_BORDER_WIDTH, DEFAULT_INNER_RADIUS, DEFAULT_INNER_BORDER_COLOR, DEFAULT_INNER_BORDER_WIDTH, DEFAULT_RADIUS_LINE_COLOR, DEFAULT_RADIUS_LINE_WIDTH, DEFAULT_FONT_SIZE, DEFAULT_TEXT_DISTANCE, } from "../../strings";
import WheelCanvas from "../WheelCanvas";
var STARTED_SPINNING = "started-spinning";
var START_SPINNING_TIME = 2600;
var CONTINUE_SPINNING_TIME = 750;
var STOP_SPINNING_TIME = 10500;
export var Wheel = function (_a) {
    var mustStartSpinning = _a.mustStartSpinning, prizeNumber = _a.prizeNumber, data = _a.data, _b = _a.onStopSpinning, onStopSpinning = _b === void 0 ? function () { } : _b, _c = _a.backgroundColors, backgroundColors = _c === void 0 ? DEFAULT_BACKGROUND_COLORS : _c, _d = _a.textColors, textColors = _d === void 0 ? DEFAULT_TEXT_COLORS : _d, _e = _a.outerBorderColor, outerBorderColor = _e === void 0 ? DEFAULT_OUTER_BORDER_COLOR : _e, _f = _a.outerBorderWidth, outerBorderWidth = _f === void 0 ? DEFAULT_OUTER_BORDER_WIDTH : _f, _g = _a.innerRadius, innerRadius = _g === void 0 ? DEFAULT_INNER_RADIUS : _g, _h = _a.innerBorderColor, innerBorderColor = _h === void 0 ? DEFAULT_INNER_BORDER_COLOR : _h, _j = _a.innerBorderWidth, innerBorderWidth = _j === void 0 ? DEFAULT_INNER_BORDER_WIDTH : _j, _k = _a.radiusLineColor, radiusLineColor = _k === void 0 ? DEFAULT_RADIUS_LINE_COLOR : _k, _l = _a.radiusLineWidth, radiusLineWidth = _l === void 0 ? DEFAULT_RADIUS_LINE_WIDTH : _l, _m = _a.fontSize, fontSize = _m === void 0 ? DEFAULT_FONT_SIZE : _m, _o = _a.perpendicularText, perpendicularText = _o === void 0 ? false : _o, _p = _a.textDistance, textDistance = _p === void 0 ? DEFAULT_TEXT_DISTANCE : _p;
    var wheelData = useRef(__spreadArrays(data));
    var _q = useState(NaN), rotationDegrees = _q[0], setRotationDegrees = _q[1];
    var _r = useState(false), hasStartedSpinning = _r[0], setHasStartedSpinning = _r[1];
    var _s = useState(false), hasStoppedSpinning = _s[0], setHasStoppedSpinning = _s[1];
    var _t = useState(false), isDataUpdated = _t[0], setIsDataUpdated = _t[1];
    useEffect(function () {
        var _a, _b;
        var dataLength = data.length;
        wheelData.current = __spreadArrays(data);
        for (var i = 0; i < dataLength; i++) {
            wheelData.current[i] = __assign(__assign({}, data[i]), { style: {
                    backgroundColor: ((_a = data[i].style) === null || _a === void 0 ? void 0 : _a.backgroundColor) ||
                        backgroundColors[i % backgroundColors.length],
                    textColor: ((_b = data[i].style) === null || _b === void 0 ? void 0 : _b.textColor) || textColors[i % textColors.length],
                } });
        }
        setIsDataUpdated(true);
    }, [data, backgroundColors, textColors]);
    useEffect(function () {
        if (mustStartSpinning) {
            startSpinning();
            var finalRotationDegreesCalculated = getRotationDegrees(prizeNumber, data.length);
            setRotationDegrees(finalRotationDegreesCalculated);
        }
    }, [data.length, mustStartSpinning, prizeNumber]);
    useEffect(function () {
        if (hasStoppedSpinning) {
            onStopSpinning();
        }
    }, [hasStoppedSpinning, onStopSpinning]);
    var startSpinning = function () {
        setHasStartedSpinning(true);
        setTimeout(function () { return setHasStoppedSpinning(true); }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
    };
    var getRouletteClass = function () {
        if (hasStartedSpinning) {
            return STARTED_SPINNING;
        }
        return "";
    };
    if (!isDataUpdated) {
        return null;
    }
    return (React.createElement(RouletteContainer, null,
        React.createElement(RotationContainer, { className: getRouletteClass(), startSpinningTime: START_SPINNING_TIME, continueSpinningTime: CONTINUE_SPINNING_TIME, stopSpinningTime: STOP_SPINNING_TIME, finalRotationDegrees: rotationDegrees },
            React.createElement(WheelCanvas, { width: "900", height: "900", data: wheelData.current, outerBorderColor: outerBorderColor, outerBorderWidth: outerBorderWidth, innerRadius: innerRadius, innerBorderColor: innerBorderColor, innerBorderWidth: innerBorderWidth, radiusLineColor: radiusLineColor, radiusLineWidth: radiusLineWidth, fontSize: fontSize, perpendicularText: perpendicularText, textDistance: textDistance })),
        React.createElement(RouletteSelectorImage, { src: rouletteSelector.src, alt: "roulette-static" })));
};
