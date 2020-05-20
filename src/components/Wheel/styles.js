import styled from 'styled-components'

import { STARTED_SPINNING } from './index'
import { NonDraggableImage } from '../common/styledComponents'

export const RouletteContainer = styled.div`
  position: relative;
  width: 88%;
  max-width: 445px;
  height: 100%;
  max-height: 445px;
  object-fit: contain;
  flex: 1;
  overflow: hidden;
  z-index: 5;

  @media only screen and (max-width: 600px) {
    width: 78%;
  }
`

export const RouletteImage = styled(NonDraggableImage)`
  position: absolute;
  width: 99%;
  left: 1px;
  right: 0;
  top: 2px;

  &.started-spinning {
    animation: spin ${({ startSpinningTime }) => startSpinningTime / 1000}s
        cubic-bezier(0.77, -0.34, 0.96, 0.9) 0s 1 normal forwards running,
      continueSpin 0.75s linear
        ${({ startSpinningTime }) => startSpinningTime / 1000}s 4 normal
        forwards running,
      stopSpin ${({ stopSpinningTime }) => stopSpinningTime / 1000}s
        cubic-bezier(0, 0, 0.25, 1.02)
        ${({ startSpinningTime, continueSpinningTime }) =>
          (startSpinningTime + continueSpinningTime) / 1000}s
        1 normal forwards running;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes continueSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes stopSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(${(props) => 1440 + props.finalRotationDegrees}deg);
    }
  }
`

export const RouletteSelectorImage = styled(NonDraggableImage)`
  position: absolute;
  z-index: 5;
  width: 17%;
  right: 0;
  top: 9px;
`
