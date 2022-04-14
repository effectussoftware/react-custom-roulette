import React, { useEffect, useRef, useState } from 'react';
import WebFont from 'webfontloader';

import {
  getQuantity,
  getRotationDegrees,
  isCustomFont,
  makeClassKey,
} from '../../utils';
import { rouletteSelector } from '../common/images';
import {
  RotationContainer,
  RouletteContainer,
  RouletteSelectorImage,
} from './styles';
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_FONT_SIZE,
  DEFAULT_INNER_BORDER_COLOR,
  DEFAULT_INNER_BORDER_WIDTH,
  DEFAULT_INNER_RADIUS,
  DEFAULT_OUTER_BORDER_COLOR,
  DEFAULT_OUTER_BORDER_WIDTH,
  DEFAULT_RADIUS_LINE_COLOR,
  DEFAULT_RADIUS_LINE_WIDTH,
  DEFAULT_SPIN_DURATION,
  DEFAULT_TEXT_COLORS,
  DEFAULT_TEXT_DISTANCE,
} from '../../strings';
import { SelectorProps, WheelData } from './types';
import WheelCanvas from '../WheelCanvas';

interface Props {
  mustStartSpinning: boolean;
  prizeNumber: number;
  data: WheelData[];
  onStopSpinning?: () => any;
  backgroundColors?: string[];
  textColors?: string[];
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerRadius?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  perpendicularText?: boolean;
  textDistance?: number;
  spinDuration?: number;
  selectorProps?: SelectorProps;
}

const STARTED_SPINNING = 'started-spinning';

const START_SPINNING_TIME = 2600;
const CONTINUE_SPINNING_TIME = 750;
const STOP_SPINNING_TIME = 8000;

export const Wheel = ({
  mustStartSpinning,
  prizeNumber,
  data,
  onStopSpinning = () => null,
  backgroundColors = DEFAULT_BACKGROUND_COLORS,
  textColors = DEFAULT_TEXT_COLORS,
  outerBorderColor = DEFAULT_OUTER_BORDER_COLOR,
  outerBorderWidth = DEFAULT_OUTER_BORDER_WIDTH,
  innerRadius = DEFAULT_INNER_RADIUS,
  innerBorderColor = DEFAULT_INNER_BORDER_COLOR,
  innerBorderWidth = DEFAULT_INNER_BORDER_WIDTH,
  radiusLineColor = DEFAULT_RADIUS_LINE_COLOR,
  radiusLineWidth = DEFAULT_RADIUS_LINE_WIDTH,
  fontFamily = '',
  fontSize = DEFAULT_FONT_SIZE,
  perpendicularText = false,
  textDistance = DEFAULT_TEXT_DISTANCE,
  spinDuration = DEFAULT_SPIN_DURATION,
  selectorProps = {},
}: Props): JSX.Element | null => {
  const [wheelData, setWheelData] = useState<WheelData[]>([...data]);
  const [prizeMap, setPrizeMap] = useState<number[][]>([[0]]);
  const [startRotationDegrees, setStartRotationDegrees] = useState(0);
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [fontUpdater, setFontUpdater] = useState(false);
  const mustStopSpinning = useRef<boolean>(false);

  const classKey = makeClassKey(5);

  const normalizedSpinDuration = Math.max(0.01, spinDuration);

  const startSpinningTime = START_SPINNING_TIME * normalizedSpinDuration;
  const continueSpinningTime = CONTINUE_SPINNING_TIME * normalizedSpinDuration;
  const stopSpinningTime = STOP_SPINNING_TIME * normalizedSpinDuration;

  const totalSpinningTime =
    startSpinningTime + continueSpinningTime + stopSpinningTime;

  useEffect(() => {
    let initialMapNum = 0;
    const auxPrizeMap: number[][] = [];
    const dataLength = data.length;
    const wheelDataAux = [{ option: '', optionSize: 1 }] as WheelData[];
    const fontsToFetch = isCustomFont(fontFamily?.trim()) ? [fontFamily] : [];

    for (let i = 0; i < dataLength; i++) {
      let fontArray = data[i]?.style?.fontFamily?.split(',') || [];
      fontArray = fontArray.map(font => font.trim()).filter(isCustomFont);
      fontsToFetch.push(...fontArray);

      wheelDataAux[i] = {
        ...data[i],
        style: {
          backgroundColor:
            data[i].style?.backgroundColor ||
            backgroundColors[i % backgroundColors.length],
          fontFamily: data[i].style?.fontFamily || fontFamily,
          fontSize: data[i].style?.fontSize || fontSize,
          textColor:
            data[i].style?.textColor || textColors[i % textColors.length],
        },
      };
      auxPrizeMap.push([]);
      for (let j = 0; j < (wheelDataAux[i].optionSize || 1); j++) {
        auxPrizeMap[i][j] = initialMapNum++;
      }
    }
    if (fontsToFetch.length > 0) {
      WebFont.load({
        google: {
          families: Array.from(new Set(fontsToFetch.filter(font => !!font))),
        },
        timeout: 1000,
        fontactive() {
          setFontUpdater(!fontUpdater);
        },
        active() {
          setIsFontLoaded(true);
          setFontUpdater(!fontUpdater);
        },
      });
    } else {
      setIsFontLoaded(true);
    }
    setWheelData([...wheelDataAux]);
    setPrizeMap(auxPrizeMap);
    setIsDataUpdated(true);
  }, [data, backgroundColors, textColors]);

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true);
      startSpinning();
      const selectedPrize =
        prizeMap[prizeNumber][
          Math.floor(Math.random() * prizeMap[prizeNumber].length)
        ];
      const finalRotationDegreesCalculated = getRotationDegrees(
        selectedPrize,
        getQuantity(prizeMap)
      );
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

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return `${STARTED_SPINNING}`;
    }
    return '';
  };

  if (!isDataUpdated) {
    return null;
  }

  return (
    <RouletteContainer style={!isFontLoaded ? { visibility: 'hidden' } : {}}>
      <RotationContainer
        className={getRouletteClass()}
        classKey={classKey}
        startSpinningTime={startSpinningTime}
        continueSpinningTime={continueSpinningTime}
        stopSpinningTime={stopSpinningTime}
        startRotationDegrees={startRotationDegrees}
        finalRotationDegrees={finalRotationDegrees}
      >
        <WheelCanvas
          width="900"
          height="900"
          data={wheelData}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          fontFamily={fontFamily}
          fontUpdater={fontUpdater}
          fontSize={fontSize}
          perpendicularText={perpendicularText}
          prizeMap={prizeMap}
          textDistance={textDistance}
        />
      </RotationContainer>
      <RouletteSelectorImage
        style={selectorProps.style}
        src={selectorProps.src || rouletteSelector.src}
        alt="roulette-static"
      />
    </RouletteContainer>
  );
};
