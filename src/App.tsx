import React, { useState } from 'react'

import { Wheel } from './components/Wheel'
import { AppContainer } from './styles'
import { WheelData } from './components/Wheel/types'

const data: WheelData[] = [
  {
    option: 'Effectus Software',
  },
  { option: '1' },
  { option: '2' },
  { option: '3' },
  { option: '4' },
  { option: '5' },
  { option: '6' },
  { option: '7' },
  { option: '8' },
  { option: '9' },
  { option: '10' },
  { option: '11' },
  { option: '12' },
  { option: '13' },
  { option: '14' },
  { option: '15' },
  { option: '16' },
  { option: '17' },
  { option: '18' },
  { option: '19' },
]

const App = () => {
  const [mustSpin, setMustSpin] = useState(false)

  return (
    <AppContainer>
      <Wheel mustStartSpinning={mustSpin} prizeNumber={0} data={data} />
      <button onClick={() => setMustSpin(true)}>ASD</button>
    </AppContainer>
  )
}

export default App
