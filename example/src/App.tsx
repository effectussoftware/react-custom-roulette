import React, { useState } from 'react';
import './App.css';

import { Wheel } from 'react-custom-roulette';

const data = [
  { option: '0', style: { backgroundColor: '#006900' } },
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
  // { option: '27' },
  // { option: '28' },
  // { option: '29' },
  // { option: '30' },
];

const backgroundColors = ['#3e3e3e', '#df3428'];
const textColors = ['white'];
const outerBorderColor = '#d8a35a';
const outerBorderWidth = 8;
const innerBorderColor = '#d8a35a';
const innerBorderWidth = 17;
const innerRadius = 40;
const radiusLineColor = '#dddddd';
const radiusLineWidth = 3;
const fontSize = 20;
const textDistance = 86;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={3}
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
      </header>
    </div>
  );
};

export default App;
