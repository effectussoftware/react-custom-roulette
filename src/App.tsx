import React, { useState } from 'react'

import { Wheel } from './components/Wheel'
import { AppContainer } from './styles'
import { WheelData } from './components/Wheel/types'

const data: WheelData[] = [
  { option: 'ASDFG' },
  { option: '1' },
  { option: '2', style: { textColor: '#f9dd50' } },
  { option: '3' },
  { option: '4' },
  { option: '5' },
  { option: '6', style: { textColor: '#70bbe0' } },
  { option: '7' },
  // { option: '8' },
  // { option: '9' },
  // { option: '10', style: { textColor: '#f9dd50' } },
  // { option: '11' },
  // { option: '12' },
  // { option: '13' },
  // { option: '14' },
  // { option: '15' },
  // { option: '16' },
  // { option: '17' },
  // { option: '18' },
  // { option: '19' },
]

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50']
const textColors = ['#0b3351']
const borderColor = 'white'
const radiusColor = 'white'
const borderWidth = 8
const radiusWidth = 8
const fontSize = 25

const App = () => {
  const [mustSpin, setMustSpin] = useState(false)

  return (
    <AppContainer>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={0}
        data={data}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontSize={fontSize}
        borderColor={borderColor}
        borderWidth={borderWidth}
        radiusColor={radiusColor}
        radiusWidth={radiusWidth}
        perpendicularText
      />
      <button onClick={() => setMustSpin(true)}>ASD</button>
    </AppContainer>
  )
}

export default App
