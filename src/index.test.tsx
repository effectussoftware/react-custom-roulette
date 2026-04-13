import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Wheel } from '.';

// test('renders Wheel component', () => {
const data = [{ option: '0' }];
const prizeNumber = 0;
const mustStartSpinning = false;

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
const onStopSpinning = () => null;

jest.useFakeTimers();

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null as unknown as HTMLDivElement;
});

describe('Render Wheel', () => {
  it('required props only', () => {
    ReactDOM.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
      />,
      container
    );
  });

  it('innerBorderWidth = 0', () => {
    ReactDOM.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        innerBorderWidth={0}
      />,
      container
    );
  });

  it('outerBorderWidth = 0', () => {
    ReactDOM.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        outerBorderWidth={0}
      />,
      container
    );
  });

  it('radiusLineWidth = 0', () => {
    ReactDOM.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        radiusLineWidth={0}
      />,
      container
    );
  });

  it('all props defined', () => {
    ReactDOM.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
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
        onStopSpinning={onStopSpinning}
      />,
      container
    );
  });

  it('render spin', () => {
    act(() => {
      ReactDOM.render(
        <Wheel data={data} prizeNumber={prizeNumber} mustStartSpinning />,
        container
      );
      jest.runOnlyPendingTimers();
    });
  });

  it('render callback trigger', () => {
    let hasBeenCalled = false;

    act(() => {
      ReactDOM.render(
        <Wheel
          data={data}
          prizeNumber={prizeNumber}
          mustStartSpinning
          onStopSpinning={() => {
            hasBeenCalled = true;
            return null;
          }}
        />,
        container
      );

      expect(hasBeenCalled).not.toBe(true);
      jest.runAllTimers();
    });
    expect(hasBeenCalled).toBe(true);
  });
});
