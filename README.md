<h1 align="center">React Custom Roulette</h1>

<div align="center">
    
  [![npm version](https://img.shields.io/npm/v/react-custom-roulette)](https://www.npmjs.com/package/react-custom-roulette)
  [![Types](https://img.shields.io/npm/types/react-custom-roulette)](https://www.typescriptlang.org/index.html)
  [![npm downloads](https://img.shields.io/npm/dm/react-custom-roulette)](https://www.npmjs.com/package/react-custom-roulette)

</div>

<p align="center">Customizable React roulette wheel with spinning animation</p>

<div align="center">
    
  ![React Custom Roulette](https://github.com/effectussoftware/react-custom-roulette/raw/master/demo/roulette-demo.gif)

</div>

## Features

- Customizable design
- Prize selection by props
- Spinning animation
- **[NEW!]** Multiple spins (see [Multi Spin](#multi-spin))
- Compatible with TypeScript

## Install

    $ npm install react-custom-roulette

or

    $ yarn add react-custom-roulette

## Quickstart

#### Wheel Component

```jsx
import React from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '1', style: { backgroundColor: 'white' } },
  { option: '2' },
]

export default () => (
  <>
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={3}
      data={data}
      backgroundColors={['#3e3e3e', '#df3428']}
      textColors={['#ffffff']}
    />
  </>
)
```

#### Props

| **Prop**                       | **Type**           | **Default**               | **Description**                                                                                       |
| ------------------------------ | ------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| mustStartSpinning _(required)_ | `boolean`          | -                         | Sets when the roulette must start the spinning animation                                              |
| prizeNumber _(required)_       | `number`           | -                         | Sets the winning option. It's value must be between 0 and data.lenght-1                               |
| data _(required)_              | `Array<WheelData>` | -                         | Array of options. Can contain styling information for a specific option (see [WheelData](#wheeldata)) |
| onStopSpinning                 | `function`         | () => null                | Callback function that is called when the roulette ends the spinning animation                        |
| backgroundColors               | `Array<string>`    | ['darkgrey', 'lightgrey'] | Array of colors that will fill the background of the roulette options, starting from option 0         |
| textColors                     | `Array<string>`    | ['black']                 | Array of colors that will fill the text of the roulette options, starting from option 0               |
| outerBorderColor               | `string`           | 'black'                   | Color of the roulette's outer border line                                                             |
| outerBorderWidth               | `number`           | 5                         | Width of the roulette's outer border line (0 represents no outer border line)                         |
| innerRadius                    | `number [0..100]`  | 0                         | Distance of the inner radius from the center of the roulette                                          |
| innerBorderColor               | `string`           | 'black'                   | Color of the roulette's inner border line                                                             |
| innerBorderWidth               | `number`           | 0                         | Width of the roulette's inner border line (0 represents no inner border line)                         |
| radiusLineColor                | `string`           | 'black'                   | Color of the radial lines that separate each option                                                   |
| radiusLineWidth                | `number`           | 5                         | Width of the radial lines that separate each option (0 represents no radial lines)                    |
| fontSize                       | `number`           | 20                        | Font size of the option string                                                                        |
| perpendicularText              | `boolean`          | false                     | When 'true', sets the option texts perpendicular to the roulette's radial lines                       |
| textDistance                   | `number [0..100]`  | 60                        | Distance of the option texts from the center of the roulette                                          |

## Types

#### WheelData

```jsx
interface WheelData {
  option: string;
  style?: StyleType; // Optional
}
```

#### StyleType

```jsx
interface StyleType {
  backgroundColor?: string; // Optional
  textColor?: string; // Optional
}
```

## Multi Spin

#### Example (using useState)

```jsx
import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: '0' },
  { option: '1' },
  { option: '2' },
]

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}

        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  )
}
```

## Contributors

This project exists thanks to all the people who contribute!

<ul>
    <li><a href="https://github.com/luchozamora1">Luis Felipe Zamora</a></li>
    <li><a href="https://github.com/nazabalm20">Martin Nazabal</a></li>
    <li><a href="https://github.com/jpmazza">JP Mazza</a></li>
</ul>

## License

This project is licensed under the MIT license, Copyright (c) 2020 <a href="https://effectussoftware.com">Effectus Software</a>. [[License](LICENSE)]
