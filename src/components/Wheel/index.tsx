import React, { useState, useEffect } from "react";

import { getRotationDegrees } from "../../utils";
import { rouletteSelector } from "../common/images";
import {
  RouletteContainer,
  RouletteSelectorImage,
  RotationContainer,
} from "./styles";

import { WheelData } from "./types";
import WheelCanvas from "../WheelCanvas";

interface Props {
  mustStartSpinning: boolean;
  prizeNumber: number;
  data: WheelData[];
  onStopSpinning?: () => any;
}

const STARTED_SPINNING = "started-spinning";

const START_SPINNING_TIME = 2600;
const CONTINUE_SPINNING_TIME = 3000;
const STOP_SPINNING_TIME = 10000;

export const Wheel = ({
  mustStartSpinning,
  prizeNumber,
  data,
  onStopSpinning = () => {},
}: Props) => {
  const [rotationDegrees, setRotationDegrees] = useState(NaN);

  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);

  useEffect(() => {
    if (mustStartSpinning) {
      startSpinning();
      const finalRotationDegreesCalculated = getRotationDegrees(
        prizeNumber,
        data.length
      );
      setRotationDegrees(finalRotationDegreesCalculated);
    }
  }, [data.length, mustStartSpinning, prizeNumber]);

  useEffect(() => {
    if (hasStoppedSpinning) {
      onStopSpinning();
    }
  }, [hasStoppedSpinning, onStopSpinning]);

  const startSpinning = () => {
    setHasStartedSpinning(true);
    setTimeout(
      () => setHasStoppedSpinning(true),
      START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300
    );
  };

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING;
    }
    return "";
  };

  return (
    <RouletteContainer>
      <RotationContainer
        className={getRouletteClass()}
        startSpinningTime={START_SPINNING_TIME}
        continueSpinningTime={CONTINUE_SPINNING_TIME}
        stopSpinningTime={STOP_SPINNING_TIME}
        finalRotationDegrees={rotationDegrees}
      >
        <WheelCanvas width="1500" height="1500" data={data} />
      </RotationContainer>
      <RouletteSelectorImage src={rouletteSelector} alt="roulette-static" />
    </RouletteContainer>
  );
};
