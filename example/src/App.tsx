import React, { useState } from 'react';
import './App.css';

import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'REACT 0', optionSize: 3 },
  { option: 'CUSTOM 1' },
  { option: 'ROULETTE 2', style: { textColor: '#f9dd50' } },
  { option: 'WHEEL' },
  { option: 'REACT', optionSize: 3 },
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
const spinDuration = 1.0;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = 0;
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };
  const [mustSpin2, setMustSpin2] = useState(false);
  const [prizeNumber2, setPrizeNumber2] = useState(0);

  const handleSpinClick2 = () => {
    const newPrizeNumber = 1;
    setPrizeNumber2(newPrizeNumber);
    setMustSpin2(true);
  };
  const [mustSpin3, setMustSpin3] = useState(false);
  const [prizeNumber3, setPrizeNumber3] = useState(0);

  const handleSpinClick3 = () => {
    const newPrizeNumber = 2;
    setPrizeNumber3(newPrizeNumber);
    setMustSpin3(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
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
            spinDuration={spinDuration}
            // perpendicularText
            textDistance={textDistance}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />
          <button className={'spin-button'} onClick={handleSpinClick}>
            SPIN
          </button>
        </div>
        <div>
          <Wheel
            mustStartSpinning={mustSpin2}
            prizeNumber={prizeNumber2}
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
            spinDuration={spinDuration}
            // perpendicularText
            textDistance={textDistance}
            onStopSpinning={() => {
              setMustSpin2(false);
            }}
          />
          <button className={'spin-button'} onClick={handleSpinClick2}>
            SPIN
          </button>
        </div>
        <div>
          <Wheel
            mustStartSpinning={mustSpin3}
            prizeNumber={prizeNumber3}
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
            spinDuration={spinDuration}
            // perpendicularText
            textDistance={textDistance}
            onStopSpinning={() => {
              setMustSpin3(false);
            }}
          />
          <button className={'spin-button'} onClick={handleSpinClick3}>
            SPIN
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
