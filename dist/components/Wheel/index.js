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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useRef, useState } from 'react';
import WebFont from 'webfontloader';
import { getQuantity, getRotationDegrees, isCustomFont } from '../../utils';
import { rouletteSelector } from '../common/images';
import { RotationContainer, RouletteContainer, RouletteSelectorImage, } from './styles';
import { DEFAULT_BACKGROUND_COLORS, DEFAULT_FONT_SIZE, DEFAULT_INNER_BORDER_COLOR, DEFAULT_INNER_BORDER_WIDTH, DEFAULT_INNER_RADIUS, DEFAULT_OUTER_BORDER_COLOR, DEFAULT_OUTER_BORDER_WIDTH, DEFAULT_RADIUS_LINE_COLOR, DEFAULT_RADIUS_LINE_WIDTH, DEFAULT_SPIN_DURATION, DEFAULT_TEXT_COLORS, DEFAULT_TEXT_DISTANCE, } from '../../strings';
import WheelCanvas from '../WheelCanvas';
var STARTED_SPINNING = 'started-spinning';
var START_SPINNING_TIME = 2600;
var CONTINUE_SPINNING_TIME = 750;
var STOP_SPINNING_TIME = 8000;
export var Wheel = function (_a) {
    var mustStartSpinning = _a.mustStartSpinning, prizeNumber = _a.prizeNumber, data = _a.data, _b = _a.onStopSpinning, onStopSpinning = _b === void 0 ? function () { return null; } : _b, _c = _a.backgroundColors, backgroundColors = _c === void 0 ? DEFAULT_BACKGROUND_COLORS : _c, _d = _a.textColors, textColors = _d === void 0 ? DEFAULT_TEXT_COLORS : _d, _e = _a.outerBorderColor, outerBorderColor = _e === void 0 ? DEFAULT_OUTER_BORDER_COLOR : _e, _f = _a.outerBorderWidth, outerBorderWidth = _f === void 0 ? DEFAULT_OUTER_BORDER_WIDTH : _f, _g = _a.innerRadius, innerRadius = _g === void 0 ? DEFAULT_INNER_RADIUS : _g, _h = _a.innerBorderColor, innerBorderColor = _h === void 0 ? DEFAULT_INNER_BORDER_COLOR : _h, _j = _a.innerBorderWidth, innerBorderWidth = _j === void 0 ? DEFAULT_INNER_BORDER_WIDTH : _j, _k = _a.radiusLineColor, radiusLineColor = _k === void 0 ? DEFAULT_RADIUS_LINE_COLOR : _k, _l = _a.radiusLineWidth, radiusLineWidth = _l === void 0 ? DEFAULT_RADIUS_LINE_WIDTH : _l, _m = _a.fontFamily, fontFamily = _m === void 0 ? '' : _m, _o = _a.fontSize, fontSize = _o === void 0 ? DEFAULT_FONT_SIZE : _o, _p = _a.perpendicularText, perpendicularText = _p === void 0 ? false : _p, _q = _a.textDistance, textDistance = _q === void 0 ? DEFAULT_TEXT_DISTANCE : _q, _r = _a.spinDuration, spinDuration = _r === void 0 ? DEFAULT_SPIN_DURATION : _r;
    var _s = useState(__spreadArray([], data, true)), wheelData = _s[0], setWheelData = _s[1];
    var _t = useState([[0]]), prizeMap = _t[0], setPrizeMap = _t[1];
    var _u = useState(0), startRotationDegrees = _u[0], setStartRotationDegrees = _u[1];
    var _v = useState(0), finalRotationDegrees = _v[0], setFinalRotationDegrees = _v[1];
    var _w = useState(false), hasStartedSpinning = _w[0], setHasStartedSpinning = _w[1];
    var _x = useState(false), hasStoppedSpinning = _x[0], setHasStoppedSpinning = _x[1];
    var _y = useState(false), isCurrentlySpinning = _y[0], setIsCurrentlySpinning = _y[1];
    var _z = useState(false), isDataUpdated = _z[0], setIsDataUpdated = _z[1];
    var _0 = useState(false), isFontLoaded = _0[0], setIsFontLoaded = _0[1];
    var _1 = useState(false), rouletteUpdater = _1[0], setRouletteUpdater = _1[1];
    var _2 = useState(0), loadedImagesCounter = _2[0], setLoadedImagesCounter = _2[1];
    var _3 = useState(0), totalImages = _3[0], setTotalImages = _3[1];
    var mustStopSpinning = useRef(false);
    var normalizedSpinDuration = Math.max(0.01, spinDuration);
    var startSpinningTime = START_SPINNING_TIME * normalizedSpinDuration;
    var continueSpinningTime = CONTINUE_SPINNING_TIME * normalizedSpinDuration;
    var stopSpinningTime = STOP_SPINNING_TIME * normalizedSpinDuration;
    var totalSpinningTime = startSpinningTime + continueSpinningTime + stopSpinningTime;
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var initialMapNum = 0;
        var auxPrizeMap = [];
        var dataLength = data.length;
        var wheelDataAux = [{ option: '', optionSize: 1 }];
        var fontsToFetch = [isCustomFont(fontFamily === null || fontFamily === void 0 ? void 0 : fontFamily.trim()) ? fontFamily : ''];
        var _loop_1 = function (i) {
            var fontArray = ((_c = (_b = (_a = data[i]) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.fontFamily) === null || _c === void 0 ? void 0 : _c.split(',')) || [];
            fontArray = fontArray.map(function (font) { return font.trim(); }).filter(isCustomFont);
            fontsToFetch.push.apply(fontsToFetch, fontArray);
            wheelDataAux[i] = __assign(__assign({}, data[i]), { style: {
                    backgroundColor: ((_d = data[i].style) === null || _d === void 0 ? void 0 : _d.backgroundColor) ||
                        backgroundColors[i % backgroundColors.length],
                    fontFamily: ((_e = data[i].style) === null || _e === void 0 ? void 0 : _e.fontFamily) || fontFamily,
                    fontSize: ((_f = data[i].style) === null || _f === void 0 ? void 0 : _f.fontSize) || fontSize,
                    textColor: ((_g = data[i].style) === null || _g === void 0 ? void 0 : _g.textColor) || textColors[i % textColors.length],
                } });
            auxPrizeMap.push([]);
            for (var j = 0; j < (wheelDataAux[i].optionSize || 1); j++) {
                auxPrizeMap[i][j] = initialMapNum++;
            }
            if (data[i].image) {
                setTotalImages(function (prevCounter) { return prevCounter + 1; });
                var img_1 = new Image();
                img_1.src = ((_h = data[i].image) === null || _h === void 0 ? void 0 : _h.uri) || '';
                img_1.onload = function () {
                    var _a, _b, _c, _d, _e, _f;
                    img_1.height = 200 * (((_a = data[i].image) === null || _a === void 0 ? void 0 : _a.sizeMultiplier) || 1);
                    img_1.width = (img_1.naturalWidth / img_1.naturalHeight) * img_1.height;
                    wheelDataAux[i].image = {
                        uri: ((_b = data[i].image) === null || _b === void 0 ? void 0 : _b.uri) || '',
                        offsetX: ((_c = data[i].image) === null || _c === void 0 ? void 0 : _c.offsetX) || 0,
                        offsetY: ((_d = data[i].image) === null || _d === void 0 ? void 0 : _d.offsetY) || 0,
                        landscape: ((_e = data[i].image) === null || _e === void 0 ? void 0 : _e.landscape) || false,
                        sizeMultiplier: ((_f = data[i].image) === null || _f === void 0 ? void 0 : _f.sizeMultiplier) || 1,
                        _imageHTML: img_1,
                    };
                    setLoadedImagesCounter(function (prevCounter) { return prevCounter + 1; });
                    setRouletteUpdater(function (prevState) { return !prevState; });
                };
            }
        };
        for (var i = 0; i < dataLength; i++) {
            _loop_1(i);
        }
        WebFont.load({
            google: {
                families: Array.from(new Set(fontsToFetch.filter(function (font) { return !!font; }))),
            },
            timeout: 1000,
            fontactive: function () {
                setRouletteUpdater(!rouletteUpdater);
            },
            active: function () {
                setIsFontLoaded(true);
                setRouletteUpdater(!rouletteUpdater);
            },
        });
        setWheelData(__spreadArray([], wheelDataAux, true));
        setPrizeMap(auxPrizeMap);
        setIsDataUpdated(true);
    }, [data, backgroundColors, textColors]);
    useEffect(function () {
        if (mustStartSpinning && !isCurrentlySpinning) {
            setIsCurrentlySpinning(true);
            startSpinning();
            var selectedPrize = prizeMap[prizeNumber][Math.floor(Math.random() * prizeMap[prizeNumber].length)];
            var finalRotationDegreesCalculated = getRotationDegrees(selectedPrize, getQuantity(prizeMap));
            setFinalRotationDegrees(finalRotationDegreesCalculated);
        }
    }, [mustStartSpinning]);
    useEffect(function () {
        if (hasStoppedSpinning) {
            setIsCurrentlySpinning(false);
            setStartRotationDegrees(finalRotationDegrees);
        }
    }, [hasStoppedSpinning]);
    var startSpinning = function () {
        setHasStartedSpinning(true);
        setHasStoppedSpinning(false);
        mustStopSpinning.current = true;
        setTimeout(function () {
            if (mustStopSpinning.current) {
                mustStopSpinning.current = false;
                setHasStartedSpinning(false);
                setHasStoppedSpinning(true);
                onStopSpinning();
            }
        }, totalSpinningTime);
    };
    var getRouletteClass = function () {
        if (hasStartedSpinning) {
            return STARTED_SPINNING;
        }
        return '';
    };
    if (!isDataUpdated) {
        return null;
    }
    return (React.createElement(RouletteContainer, { style: !isFontLoaded ||
            (totalImages > 0 && loadedImagesCounter !== totalImages)
            ? { visibility: 'hidden' }
            : {} },
        React.createElement(RotationContainer, { className: getRouletteClass(), startSpinningTime: startSpinningTime, continueSpinningTime: continueSpinningTime, stopSpinningTime: stopSpinningTime, startRotationDegrees: startRotationDegrees, finalRotationDegrees: finalRotationDegrees },
            React.createElement(WheelCanvas, { width: "900", height: "900", data: wheelData, outerBorderColor: outerBorderColor, outerBorderWidth: outerBorderWidth, innerRadius: innerRadius, innerBorderColor: innerBorderColor, innerBorderWidth: innerBorderWidth, radiusLineColor: radiusLineColor, radiusLineWidth: radiusLineWidth, fontFamily: fontFamily, fontSize: fontSize, perpendicularText: perpendicularText, prizeMap: prizeMap, rouletteUpdater: rouletteUpdater, textDistance: textDistance })),
        React.createElement(RouletteSelectorImage, { src: rouletteSelector.src, alt: "roulette-static" })));
};
