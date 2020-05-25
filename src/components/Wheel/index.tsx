import React, { useState, useEffect, useRef } from 'react'

import { getRotationDegrees } from '../../utils'
import { rouletteSelector } from '../common/images'
import {
  RouletteContainer,
  RouletteSelectorImage,
  RotationContainer,
} from './styles'
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_TEXT_COLORS,
  DEFAULT_BORDER_COLOR,
  DEFAULT_LINE_COLOR,
} from '../../strings'
import { WheelData } from './types'
import WheelCanvas from '../WheelCanvas'

interface Props {
  mustStartSpinning: boolean
  prizeNumber: number
  data: WheelData[]
  onStopSpinning?: () => any
  fillBackgroundColors?: string[]
  fillTextColors?: string[]
  borderColor?: string
  radiusColor?: string
}

const STARTED_SPINNING = 'started-spinning'

const START_SPINNING_TIME = 2600
const CONTINUE_SPINNING_TIME = 3000
const STOP_SPINNING_TIME = 10000

export const Wheel = ({
  mustStartSpinning,
  prizeNumber,
  data,
  onStopSpinning = () => {},
  fillBackgroundColors = DEFAULT_BACKGROUND_COLORS,
  fillTextColors = DEFAULT_TEXT_COLORS,
  borderColor = DEFAULT_BORDER_COLOR,
  radiusColor = DEFAULT_LINE_COLOR,
}: Props) => {
  const wheelData = useRef<WheelData[]>([...data])
  const [rotationDegrees, setRotationDegrees] = useState(NaN)
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false)
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false)
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  useEffect(() => {
    const dataLength = data.length
    wheelData.current = [...data]
    for (let i = 0; i < dataLength; i++) {
      wheelData.current[i] = {
        ...data[i],
        style: {
          backgroundColor:
            data[i].style?.backgroundColor ||
            fillBackgroundColors[i % fillBackgroundColors.length],
          textColor:
            data[i].style?.textColor ||
            fillTextColors[i % fillTextColors.length],
        },
      }
    }
    setIsDataUpdated(true)
  }, [data, fillBackgroundColors, fillTextColors])

  useEffect(() => {
    if (mustStartSpinning) {
      startSpinning()
      const finalRotationDegreesCalculated = getRotationDegrees(
        prizeNumber,
        data.length,
      )
      setRotationDegrees(finalRotationDegreesCalculated)
    }
  }, [data.length, mustStartSpinning, prizeNumber])

  useEffect(() => {
    if (hasStoppedSpinning) {
      onStopSpinning()
    }
  }, [hasStoppedSpinning, onStopSpinning])

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

  if (!isDataUpdated) {
    return null
  }

  return (
    <RouletteContainer>
      <RotationContainer
        className={getRouletteClass()}
        startSpinningTime={START_SPINNING_TIME}
        continueSpinningTime={CONTINUE_SPINNING_TIME}
        stopSpinningTime={STOP_SPINNING_TIME}
        finalRotationDegrees={rotationDegrees}
      >
        <WheelCanvas
          width="1500"
          height="1500"
          data={wheelData.current}
          fillTextColors={fillTextColors}
          fillBackgroundColors={fillBackgroundColors}
          borderColor={borderColor}
          radiusColor={radiusColor}
        />
      </RotationContainer>
      <RouletteSelectorImage src={rouletteSelector} alt="roulette-static" />
    </RouletteContainer>
  )
}
