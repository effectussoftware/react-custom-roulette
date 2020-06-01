<h1 align="center">React Custom Roulette</h1>

<p align="center">Customizable React roulette wheel with spinning animation</p>

<div align="center">
    
[![npm version](https://img.shields.io/npm/v/react-custom-roulette)](https://www.npmjs.com/package/react-custom-roulette)
[![Types](https://img.shields.io/npm/types/react-custom-roulette)](https://www.typescriptlang.org/index.html)

</div>

## Features

- Customizable design
- Prize selection by props
- Spinning animation
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

| **Prop**                       | **Type**           | **Default**               | **Description** |
| ------------------------------ | ------------------ | ------------------------- | --------------- |
| mustStartSpinning _(required)_ | `boolean`          | -                         |                 |
| prizeNumber _(required)_       | `number`           | -                         |                 |
| data _(required)_              | `Array<WheelData>` | -                         |                 |
| onStopSpinning                 | `function`         | () => null                |                 |
| backgroundColors               | `Array<string>`    | ['darkgrey', 'lightgrey'] |                 |
| textColors                     | `Array<string>`    | ['black']                 |                 |
| outerBorderColor               | `string`           | 'black'                   |                 |
| outerBorderWidth               | `number`           | 5                         |                 |
| innerRadius                    | `number [0..100]`  | 0                         |                 |
| innerBorderColor               | `string`           | 'black'                   |                 |
| innerBorderWidth               | `number`           | 0                         |                 |
| radiusLineColor                | `string`           | 'black'                   |                 |
| radiusLineWidth                | `number`           | 5                         |                 |
| fontSize                       | `number`           | 20                        |                 |
| perpendicularText              | `boolean`          | false                     |                 |
| textDistance                   | `number [0..100]`  | 60                        |                 |

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
