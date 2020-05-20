import React, { useState } from 'react'

import { getRotationDegrees } from '../../utils'
import { rouletteWithTexts, rouletteSelector } from '../common/images'
import {
  RouletteContainer,
  RouletteImage,
  RouletteSelectorImage,
} from './styles'

interface Props {
  mustStartSpinning: boolean
}

const PRIZES = [1, 2, 3]
const STARTED_SPINNING = 'started-spinning'

const NUMBER_OF_PRIZES = 8
const START_SPINNING_TIME = 2600
const CONTINUE_SPINNING_TIME = 3000
const STOP_SPINNING_TIME = 10000

export const Wheel = (props: Props) => {
  const [rotationDegrees, setRotationDegrees] = useState(NaN)

  const [hasStartedSpinning, setHasStartedSpinning] = useState(false)
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false)

  const startSpinning = () => {
    setHasStartedSpinning(true)
    setTimeout(
      () => setHasStoppedSpinning(true),
      START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300,
    )
  }

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING
    }
    return ''
  }

  const setPrizeData = (prizeNumber: number) => {
    const finalRotationDegreesCalculated = getRotationDegrees(
      prizeNumber,
      NUMBER_OF_PRIZES,
    )
    setRotationDegrees(finalRotationDegreesCalculated)
  }

  return (
    <RouletteContainer>
      <RouletteImage
        src={rouletteWithTexts}
        alt="roulette-static"
        className={getRouletteClass()}
        startSpinningTime={START_SPINNING_TIME}
        continueSpinningTime={CONTINUE_SPINNING_TIME}
        stopSpinningTime={STOP_SPINNING_TIME}
        finalRotationDegrees={rotationDegrees}
      />
      <RouletteSelectorImage src={rouletteSelector} alt="roulette-static" />
    </RouletteContainer>
  )
}
