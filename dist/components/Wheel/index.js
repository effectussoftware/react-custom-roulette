import React, { useEffect, useRef, useState } from 'react';
import WebFont from 'webfontloader';
import { getQuantity, getRotationDegrees, isCustomFont, makeClassKey, } from '../../utils';
import { roulettePointer } from '../common/images';
import { RotationContainer, RouletteContainer, RoulettePointerImage, } from './styles';
import { DEFAULT_BACKGROUND_COLORS, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, DEFAULT_FONT_STYLE, DEFAULT_FONT_WEIGHT, DEFAULT_INNER_BORDER_COLOR, DEFAULT_INNER_BORDER_WIDTH, DEFAULT_INNER_RADIUS, DEFAULT_OUTER_BORDER_COLOR, DEFAULT_OUTER_BORDER_WIDTH, DEFAULT_RADIUS_LINE_COLOR, DEFAULT_RADIUS_LINE_WIDTH, DEFAULT_SPIN_DURATION, DEFAULT_TEXT_COLORS, DEFAULT_TEXT_DISTANCE, WEB_FONTS, DISABLE_INITIAL_ANIMATION, } from '../../strings';
import WheelCanvas from '../WheelCanvas';
const STARTED_SPINNING = 'started-spinning';
const START_SPINNING_TIME = 2600;
const CONTINUE_SPINNING_TIME = 750;
const STOP_SPINNING_TIME = 8000;
export const Wheel = ({ mustStartSpinning, prizeNumber, data, onStopSpinning = () => null, backgroundColors = DEFAULT_BACKGROUND_COLORS, textColors = DEFAULT_TEXT_COLORS, outerBorderColor = DEFAULT_OUTER_BORDER_COLOR, outerBorderWidth = DEFAULT_OUTER_BORDER_WIDTH, innerRadius = DEFAULT_INNER_RADIUS, innerBorderColor = DEFAULT_INNER_BORDER_COLOR, innerBorderWidth = DEFAULT_INNER_BORDER_WIDTH, radiusLineColor = DEFAULT_RADIUS_LINE_COLOR, radiusLineWidth = DEFAULT_RADIUS_LINE_WIDTH, fontFamily = WEB_FONTS[0], fontSize = DEFAULT_FONT_SIZE, fontWeight = DEFAULT_FONT_WEIGHT, fontStyle = DEFAULT_FONT_STYLE, perpendicularText = false, textDistance = DEFAULT_TEXT_DISTANCE, spinDuration = DEFAULT_SPIN_DURATION, startingOptionIndex = -1, pointerProps = {}, disableInitialAnimation = DISABLE_INITIAL_ANIMATION, }) => {
    const [wheelData, setWheelData] = useState([...data]);
    const [prizeMap, setPrizeMap] = useState([[0]]);
    const [startRotationDegrees, setStartRotationDegrees] = useState(0);
    const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
    const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
    const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
    const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [rouletteUpdater, setRouletteUpdater] = useState(false);
    const [loadedImagesCounter, setLoadedImagesCounter] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const mustStopSpinning = useRef(false);
    const classKey = makeClassKey(5);
    const normalizedSpinDuration = Math.max(0.01, spinDuration);
    const startSpinningTime = START_SPINNING_TIME * normalizedSpinDuration;
    const continueSpinningTime = CONTINUE_SPINNING_TIME * normalizedSpinDuration;
    const stopSpinningTime = STOP_SPINNING_TIME * normalizedSpinDuration;
    const totalSpinningTime = startSpinningTime + continueSpinningTime + stopSpinningTime;
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let initialMapNum = 0;
        const auxPrizeMap = [];
        const dataLength = (data === null || data === void 0 ? void 0 : data.length) || 0;
        const wheelDataAux = [{ option: '', optionSize: 1 }];
        const fontsToFetch = isCustomFont(fontFamily === null || fontFamily === void 0 ? void 0 : fontFamily.trim()) ? [fontFamily] : [];
        for (let i = 0; i < dataLength; i++) {
            let fontArray = ((_c = (_b = (_a = data[i]) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.fontFamily) === null || _c === void 0 ? void 0 : _c.split(',')) || [];
            fontArray = fontArray.map(font => font.trim()).filter(isCustomFont);
            fontsToFetch.push(...fontArray);
            wheelDataAux[i] = Object.assign(Object.assign({}, data[i]), { style: {
                    backgroundColor: ((_d = data[i].style) === null || _d === void 0 ? void 0 : _d.backgroundColor) ||
                        (backgroundColors === null || backgroundColors === void 0 ? void 0 : backgroundColors[i % (backgroundColors === null || backgroundColors === void 0 ? void 0 : backgroundColors.length)]) ||
                        DEFAULT_BACKGROUND_COLORS[0],
                    fontFamily: ((_e = data[i].style) === null || _e === void 0 ? void 0 : _e.fontFamily) || fontFamily || DEFAULT_FONT_FAMILY,
                    fontSize: ((_f = data[i].style) === null || _f === void 0 ? void 0 : _f.fontSize) || fontSize || DEFAULT_FONT_SIZE,
                    fontWeight: ((_g = data[i].style) === null || _g === void 0 ? void 0 : _g.fontWeight) || fontWeight || DEFAULT_FONT_WEIGHT,
                    fontStyle: ((_h = data[i].style) === null || _h === void 0 ? void 0 : _h.fontStyle) || fontStyle || DEFAULT_FONT_STYLE,
                    textColor: ((_j = data[i].style) === null || _j === void 0 ? void 0 : _j.textColor) ||
                        (textColors === null || textColors === void 0 ? void 0 : textColors[i % (textColors === null || textColors === void 0 ? void 0 : textColors.length)]) ||
                        DEFAULT_TEXT_COLORS[0],
                } });
            auxPrizeMap.push([]);
            for (let j = 0; j < (wheelDataAux[i].optionSize || 1); j++) {
                auxPrizeMap[i][j] = initialMapNum++;
            }
            if (data[i].image) {
                setTotalImages(prevCounter => prevCounter + 1);
                const img = new Image();
                img.src = ((_k = data[i].image) === null || _k === void 0 ? void 0 : _k.uri) || '';
                img.onload = () => {
                    var _a, _b, _c, _d, _e, _f;
                    img.height = 200 * (((_a = data[i].image) === null || _a === void 0 ? void 0 : _a.sizeMultiplier) || 1);
                    img.width = (img.naturalWidth / img.naturalHeight) * img.height;
                    wheelDataAux[i].image = {
                        uri: ((_b = data[i].image) === null || _b === void 0 ? void 0 : _b.uri) || '',
                        offsetX: ((_c = data[i].image) === null || _c === void 0 ? void 0 : _c.offsetX) || 0,
                        offsetY: ((_d = data[i].image) === null || _d === void 0 ? void 0 : _d.offsetY) || 0,
                        landscape: ((_e = data[i].image) === null || _e === void 0 ? void 0 : _e.landscape) || false,
                        sizeMultiplier: ((_f = data[i].image) === null || _f === void 0 ? void 0 : _f.sizeMultiplier) || 1,
                        _imageHTML: img,
                    };
                    setLoadedImagesCounter(prevCounter => prevCounter + 1);
                    setRouletteUpdater(prevState => !prevState);
                };
            }
        }
        if ((fontsToFetch === null || fontsToFetch === void 0 ? void 0 : fontsToFetch.length) > 0) {
            try {
                WebFont.load({
                    google: {
                        families: Array.from(new Set(fontsToFetch.filter(font => !!font))),
                    },
                    timeout: 1000,
                    fontactive() {
                        setRouletteUpdater(!rouletteUpdater);
                    },
                    active() {
                        setIsFontLoaded(true);
                        setRouletteUpdater(!rouletteUpdater);
                    },
                });
            }
            catch (err) {
                console.log('Error loading webfonts:', err);
            }
        }
        else {
            setIsFontLoaded(true);
        }
        setWheelData([...wheelDataAux]);
        setPrizeMap(auxPrizeMap);
        setStartingOption(startingOptionIndex, auxPrizeMap);
        setIsDataUpdated(true);
    }, [data, backgroundColors, textColors]);
    useEffect(() => {
        var _a;
        if (mustStartSpinning && !isCurrentlySpinning) {
            setIsCurrentlySpinning(true);
            startSpinning();
            const selectedPrize = prizeMap[prizeNumber][Math.floor(Math.random() * ((_a = prizeMap[prizeNumber]) === null || _a === void 0 ? void 0 : _a.length))];
            const finalRotationDegreesCalculated = getRotationDegrees(selectedPrize, getQuantity(prizeMap));
            setFinalRotationDegrees(finalRotationDegreesCalculated);
        }
    }, [mustStartSpinning]);
    useEffect(() => {
        if (hasStoppedSpinning) {
            setIsCurrentlySpinning(false);
            setStartRotationDegrees(finalRotationDegrees);
        }
    }, [hasStoppedSpinning]);
    const startSpinning = () => {
        setHasStartedSpinning(true);
        setHasStoppedSpinning(false);
        mustStopSpinning.current = true;
        setTimeout(() => {
            if (mustStopSpinning.current) {
                mustStopSpinning.current = false;
                setHasStartedSpinning(false);
                setHasStoppedSpinning(true);
                onStopSpinning();
            }
        }, totalSpinningTime);
    };
    const setStartingOption = (optionIndex, optionMap) => {
        var _a;
        if (startingOptionIndex >= 0) {
            const idx = Math.floor(optionIndex) % (optionMap === null || optionMap === void 0 ? void 0 : optionMap.length);
            const startingOption = optionMap[idx][Math.floor(((_a = optionMap[idx]) === null || _a === void 0 ? void 0 : _a.length) / 2)];
            setStartRotationDegrees(getRotationDegrees(startingOption, getQuantity(optionMap), false));
        }
    };
    const getRouletteClass = () => {
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
        React.createElement(RotationContainer, { className: getRouletteClass(), "$classKey": classKey, "$startSpinningTime": startSpinningTime, "$continueSpinningTime": continueSpinningTime, "$stopSpinningTime": stopSpinningTime, "$startRotationDegrees": startRotationDegrees, "$finalRotationDegrees": finalRotationDegrees, "$disableInitialAnimation": disableInitialAnimation },
            React.createElement(WheelCanvas, { width: "900", height: "900", data: wheelData, outerBorderColor: outerBorderColor, outerBorderWidth: outerBorderWidth, innerRadius: innerRadius, innerBorderColor: innerBorderColor, innerBorderWidth: innerBorderWidth, radiusLineColor: radiusLineColor, radiusLineWidth: radiusLineWidth, fontFamily: fontFamily, fontWeight: fontWeight, fontStyle: fontStyle, fontSize: fontSize, perpendicularText: perpendicularText, prizeMap: prizeMap, rouletteUpdater: rouletteUpdater, textDistance: textDistance })),
        React.createElement(RoulettePointerImage, { style: pointerProps === null || pointerProps === void 0 ? void 0 : pointerProps.style, src: (pointerProps === null || pointerProps === void 0 ? void 0 : pointerProps.src) || roulettePointer.src, alt: "roulette-static" })));
};
