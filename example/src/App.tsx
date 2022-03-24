import React, { useState } from 'react';
import './App.css';

import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'REACT' },
  {
    option: 'CUSTOM',
    style: {
      fontSize: 30,
      fontFamily: 'Open Sans, Hurricane, Oswald, serif',
    },
  },
  {
    option: 'ROULETTE',
    style: {
      textColor: '#f9dd50',
      fontFamily:
        'Josefin Sans, cursive, Chilanka, Mulish, Arimo, Dosis, Cabin, Bitter, Anton, Lobster, Fredoka, Open Sans, Montserrat, Roboto, Helvetica, Arial, sans-serif',
    },
  },
  { option: 'WHEEL' },
  { option: 'REACT', style: { fontFamily: 'Fredoka' } },
  {
    option: 'CUSTOM',
    style: { fontSize: 40, fontFamily: 'Prompt', textColor: 'white' },
  },
  { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
  { option: 'WHEEL', style: { fontFamily: 'Times New roman' } },
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
const fontFamily = 'Ubuntu';
const fontSize = 20;
const textDistance = 60;
const spinDuration = 1.0;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          // @ts-ignore
          fontFamily={fontFamily}
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
      </header>
    </div>
  );
};

export default App;
