import React, { useState } from 'react';
import './App.css';

import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'REACT' },
  {
    option: 'CUSTOM',
    image: {
      uri:
        'https://as01.epimg.net/futbol/imagenes/2021/08/06/primera/1628278370_371377_1628282424_noticia_normal_recorte1.jpg',
      sizeMultiplier: 1,
    },
    style: { textColor: 'white' },
  },

  { option: 'ROULETTE', style: { textColor: '#f9dd50' } },
  {
    option: 'WHEEL',
    image: {
      uri:
        'https://images.ecestaticos.com/mXiaMzhISsDQH7Ki2YqTyi3XcCc=/0x0:0x0/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F36a%2Fe15%2F4ac%2F36ae154acded8663e9bd0402a78ab17f.jpg',
      sizeMultiplier: 1,
    },
  },

  { option: 'REACT' },
  {
    option: 'CUSTOM',
    image: {
      uri:
        'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_BSXPlBjoBeJruSaCamv7kQuMNjoIIWX0CITXUVoapFCbRM9g',
      // height: 4 * 40,
      // width: 3 * 40,
      sizeMultiplier: 1,
    },
  },
  { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
  {
    option: 'WHEEL',
    image: {
      uri:
        'https://phantom-marca.unidadeditorial.es/341a9478190ebbb9984e09b1c3238ad8/resize/1320/f/jpg/assets/multimedia/imagenes/2022/01/12/16420121570853.jpg',
      sizeMultiplier: 1,
    },
  },
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
const fontFamily = 'Nunito';
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
