import React, { useState, useEffect, createRef } from 'react'

import { getRotationDegrees, drawWheel } from '../../utils'
import { rouletteWithTexts, rouletteSelector } from '../common/images'
import {
  RouletteContainer,
  RouletteImage,
  RouletteSelectorImage,
} from './styles'

interface Props {
  mustStartSpinning: boolean
  prizeNumber: number
  data: { option: string; color: string }[]
}

const STARTED_SPINNING = 'started-spinning'

const START_SPINNING_TIME = 2600
const CONTINUE_SPINNING_TIME = 3000
const STOP_SPINNING_TIME = 10000

export const Wheel = ({ mustStartSpinning, prizeNumber, data }: Props) => {
  const [rotationDegrees, setRotationDegrees] = useState(NaN)

  const [hasStartedSpinning, setHasStartedSpinning] = useState(false)
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false)

  const canvasRef = createRef<HTMLCanvasElement>()

  useEffect(() => {
    console.log('canvas', canvasRef)
    drawWheel(canvasRef, data)
  }, [])

  useEffect(() => {
    if (mustStartSpinning) {
      startSpinning()
      const finalRotationDegreesCalculated = getRotationDegrees(
        prizeNumber,
        data.length,
      )
      setRotationDegrees(finalRotationDegreesCalculated)
    }
  }, [mustStartSpinning])

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

  return (
    <RouletteContainer>
      <RouletteImage
        ref={canvasRef}
        width="1000"
        height="1000"
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
