import React, { useState } from 'react'

import { Wheel } from './components/Wheel'
import { AppContainer } from './styles'
import { WheelData } from './components/Wheel/types'

const data: WheelData[] = [
  { option: '0', style: { backgroundColor: '#458316' } },
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
  { option: '20' },
  { option: '21' },
  { option: '22' },
  { option: '23' },
  { option: '24' },
  { option: '25' },
  { option: '26' },
  { option: '27' },
  { option: '28' },
  { option: '29' },
  { option: '30' },
]

const backgroundColors = ['#3e3e3e', '#df3428']
const textColors = ['white']
const outerBorderColor = '#d8a35a'
const outerBorderWidth = 6
const innerBorderColor = '#d8a35a'
const innerBorderWidth = 8
const innerRadius = 50
const radiusLineColor = 'white'
const radiusLineWidth = 2
const fontSize = 20
const textDistance = 90

// const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50']
// const textColors = ['#0b3351']
// const outerBorderColor = 'white'
// const outerBorderWidth = 6
// const innerBorderColor = 'white'
// const innerBorderWidth = 0
// const innerRadius = 0
// const radiusLineColor = 'white'
// const radiusLineWidth = 5
// const fontSize = 20
// const textDistance = 70

const App = () => {
  const [mustSpin, setMustSpin] = useState(false)

  return (
    <AppContainer>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={14}
        data={data}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontSize={fontSize}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        perpendicularText
        textDistance={textDistance}
      />
      <button onClick={() => setMustSpin(true)}>ASD</button>
    </AppContainer>
  )
}

export default App
