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
- Prize selection with props
- Spinning animation (customizable spin duration)
- **[NEW!]** Images as items (see [Types](#types))
- **[NEW!]** Customizable pointer image
- Multiple consecutive spins (see [Multi Spin](#multi-spin))
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

| **Prop**                        | **Type**           | **Default**               | **Description**                                                    |
|---------------------------------|--------------------|---------------------------|--------------------------------------------------------------------|
| mustStartSpinning _(required)_  | `boolean`          | -                         | Sets when the roulette must start the spinning animation                                              |
| prizeNumber _(required)_        | `number`           | -                         | Sets the winning option. It's value must be between 0 and data.lenght-1                                               |
| data _(required)_               | `Array<WheelData>` | -                         | Array of options. Can contain styling information for a specific option (see [WheelData](#wheeldata))                          |
| onStopSpinning                  | `function`         | () => null                | Callback function that is called when the roulette ends the spinning animation                                              |
| backgroundColors                | `Array<string>`    | ['darkgrey', 'lightgrey'] | Array of colors that will fill the background of the roulette options, starting from option 0                                 |
| textColors                      | `Array<string>`    | ['black']                 | Array of colors that will fill the text of the roulette options, starting from option 0                                 |
| outerBorderColor                | `string`           | 'black'                   | Color of the roulette's outer border line                                                   |
| outerBorderWidth                | `number`           | 5                         | Width of the roulette's outer border line (0 represents no outer border line)                                                  |
| innerRadius                     | `number [0..100]`  | 0                         | Distance of the inner radius from the center of the roulette                                               |
| innerBorderColor                | `string`           | 'black'                   | Color of the roulette's inner border line                                                   |
| innerBorderWidth                | `number`           | 0                         | Width of the roulette's inner border line (0 represents no inner border line)                                                  |
| radiusLineColor                 | `string`           | 'black'                   | Color of the radial lines that separate each option                                                 |
| radiusLineWidth                 | `number`           | 5                         | Width of the radial lines that separate each option (0 represents no radial lines)                                          |
| fontFamily                      | `string`           | 'Helvetica, Arial'        | Global font family of the option string. Non-Web safe fonts are fetched from https://fonts.google.com/. All available fonts can be found there.            |
| fontSize                        | `number`           | 20                        | Global font size of the option string                            |
| fontWeight                      | `number | string`  | 'bold'                    | Global font weight of the option string                          |
| fontStyle                       | `string`           | 'normal'                  | Global font style of the option string                           |
| perpendicularText               | `boolean`          | false                     | When 'true', sets the option texts perpendicular to the roulette's radial lines                                           |
| textDistance                    | `number [0..100]`  | 60                        | Distance of the option texts from the center of the roulette     |
| spinDuration                    | `number [0.01 ..]` | 1.0                       | Coefficient to adjust the default spin duration                  |
| startingOptionIndex             | `number`           | -                         | Set which option (through its index in the `data` array) will be initially selected by the roulette (before spinning). If not specified the roulette will render without choosing a starting option                    |
| pointerProps                    | `PointerProps`     | { src: roulettePointer }  | Image source and CSS styling to apply to the pointer image.                                                 |
| disableInitialAnimation         | `boolean`          | false                     | When 'true', disables the initial backwards wheel animation      |

## Types

#### WheelData

```jsx
interface WheelData {
  option?: string;
  image?: ImageProps;
  style?: StyleType; // Optional
  optionSize?: number; // Optional
}
```

| **Prop**   | **Type**     | **Default** | **Description**                                                                                       |
|------------|--------------|-------------|-------------------------------------------------------------------------------------------------------|
| option     | `string`     | ''          | String to be rendered inside an option.                                                               |
| image      | `ImageProps` | -           | Image to be rendered inside an option. It is configured through [ImageProps](#imageprops)             |
| style      | `StyleType`  | -           | Styles for option. It is configured through [StyleType](#styletype)                                   |
| optionSize | `number`     | 1           | Integer that sets the size of the option measured in roulette pieces. For example: if `data` provides 2 options A and B, and you set A's `optionSize` to `2`, B's `optionSize` to `1`, the roulette will render `3` pieces: 2 corresponding to A and 1 corresponding to B. Therefore, A will appear to be twice as big as B. |

#### StyleType

```jsx
interface StyleType {
  backgroundColor?: string; // Optional
  textColor?: string; // Optional
  fontFamily?: string; // Optional
  fontSize?: number; // Optional
  fontWeight?: number | string; // Optional
  fontStyle?: string; // Optional
}
```

| **Prop**        | **Type**          | **Default**               | **Description**                                                    |
|-----------------|-------------------|---------------------------|--------------------------------------------------------------------|
| backgroundColor | `string`          | 'darkgrey' or 'lightgrey' | Background color for option                                        |
| textColor       | `string`          | 'black'                   | Text color                                                         |
| fontFamily      | `string`          | 'Helvetica, Arial'        | String containing text font and its fallbacks separated by commas  |
| fontSize        | `number`          | 20                        | Font size number                                                   |
| fontWeight      | `number | string` | 'bold'                    | Font weight string or number                                       |
| fontStyle       | `string`          | 'normal'                  | Font style string                                                  |

#### ImageProps

```jsx
interface ImageProps {
  uri: string;
  offsetX?: number; // Optional
  offsetY?: number; // Optional
  sizeMultiplier?: number; // Optional
  landscape?: boolean; // Optional
}
```

| **Prop**       | **Type**  | **Default** | **Description**                                                                       |
|----------------|-----------|-------------|---------------------------------------------------------------------------------------|
| uri            | `string`  | -           | Image source. It can be url or path.                                                  |
| offsetX        | `number`  | 0           | Image offset in its X axis                                                            |
| offsetY        | `number`  | 0           | Image offset in its Y axis                                                            |
| sizeMultiplier | `number`  | 1           | A value of 1 means image height is calculated as `200px * sizeMultiplier` and width will be calculated to keep aspect ratio. |
| landscape      | `boolean` | false       | If true, image will be rotated 90 degrees so as to render in a landscape orientation. |

#### PointerProps

```jsx
interface PointerProps {
  src?: string; // Optional
  style?: React.CSSProperties; // Optional
}
```

| **Prop** | **Type**              | **Default**               | **Description**             |
|----------|-----------------------|---------------------------|-----------------------------|
| src      | `string`              | -                         | Image src.                  |
| style    | `React.CSSProperties` | -                         | Styling for pointer image.  |

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
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}

        onStopSpinning={() => {
          setMustSpin(false);
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
    <li><a href="https://github.com/TakeshiOnishi">TakeshiOnishi</a></li>
    <li><a href="https://github.com/Gaston-Gonzalez">Gastón González</a></li>
    <li><a href="https://github.com/jpmartinezeff">Juan Pablo Martinez</a></li>
    <li><a href="https://github.com/Acarvajal904">Andres Carvajal</a></li>
</ul>

## License

This project is licensed under the MIT license, Copyright (c) 2023 <a href="https://effectussoftware.com">Effectus Software</a>. [[License](LICENSE)]
