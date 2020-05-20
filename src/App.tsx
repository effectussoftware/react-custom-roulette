import React, { useState, createRef } from 'react'

import { Wheel } from './components/Wheel'
import { AppContainer } from './styles'

interface State {
  mustSpin: boolean
}

const data = [
  { option: '0', color: 'cyan' },
  { option: '1', color: 'blue' },
  { option: '2', color: 'red' },
  { option: '3', color: 'yellow' },
  { option: '4', color: 'grey' },
  { option: '5', color: 'green' },
  { option: '6', color: 'black' },
  { option: '7', color: 'white' },
  { option: '8', color: 'darkred' },
  { option: '9', color: 'gold' },
  { option: '10', color: 'silver' },
  { option: '11', color: 'magenta' },
  { option: '12', color: 'orange' },
  { option: '13', color: 'darkgrey' },
  { option: '14', color: 'lightgreen' },
  { option: '15', color: 'darkblue' },
  { option: '16', color: 'darkcyan' },
  { option: '17', color: 'darkmagenta' },
  { option: '18', color: 'lightyellow' },
  { option: '19', color: 'lightgrey' },
]
class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = { mustSpin: false }
  }

  render() {
    const { mustSpin } = this.state
    return (
      <AppContainer>
        <Wheel mustStartSpinning={mustSpin} prizeNumber={10} data={data} />
        <button onClick={() => this.setState({ mustSpin: true })}>ASD</button>
      </AppContainer>
    )
  }
}

export default App
