import React, { useState, createRef } from 'react'

import { Wheel } from './components/Wheel'
import { AppContainer } from './styles'

interface State {
  mustSpin: boolean
}
class App extends React.Component<{}, State> {
  private canvasRef: any
  constructor(props: any) {
    super(props)

    this.state = { mustSpin: false }
    this.canvasRef = createRef<HTMLCanvasElement>()
  }

  render() {
    const { mustSpin } = this.state
    return (
      <AppContainer>
        <Wheel mustStartSpinning={mustSpin} prizeNumber={3} />
        <button onClick={() => this.setState({ mustSpin: true })}>ASD</button>
      </AppContainer>
    )
  }
}

export default App
