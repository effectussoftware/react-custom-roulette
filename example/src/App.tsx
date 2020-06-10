import React, { useState } from 'react';
import './App.css';

import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'REACT' },
  { option: 'CUSTOM' },
  { option: 'ROULETTE', style: { textColor: '#f9dd50' } },
  { option: 'WHEEL' },
  { option: 'REACT' },
  { option: 'CUSTOM' },
  { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
  { option: 'WHEEL' },
];

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50'];
const textColors = ['#0b3351'];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 8;
const fontSize = 17;
const textDistance = 60;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={2}
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
          // perpendicularText
          textDistance={textDistance}
        />
        <button className={'spin-button'} onClick={() => setMustSpin(true)}>
          SPIN
        </button>
      </header>
    </div>
  );
};

export default App;
