import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Wheel } from '.';
// test('renders Wheel component', () => {
var data = [{ option: '0' }];
var prizeNumber = 0;
var mustStartSpinning = false;
var backgroundColors = ['#3e3e3e', '#df3428'];
var textColors = ['white'];
var outerBorderColor = '#d8a35a';
var outerBorderWidth = 8;
var innerBorderColor = '#d8a35a';
var innerBorderWidth = 17;
var innerRadius = 40;
var radiusLineColor = '#dddddd';
var radiusLineWidth = 3;
var fontSize = 20;
var textDistance = 86;
var onStopSpinning = function () { return null; };
jest.useFakeTimers();
var container;
beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
});
afterEach(function () {
    document.body.removeChild(container);
    container = null;
});
describe('Render Wheel', function () {
    it('required props only', function () {
        ReactDOM.render(React.createElement(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning }), container);
    });
    it('innerBorderWidth = 0', function () {
        ReactDOM.render(React.createElement(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, innerBorderWidth: 0 }), container);
    });
    it('outerBorderWidth = 0', function () {
        ReactDOM.render(React.createElement(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, outerBorderWidth: 0 }), container);
    });
    it('radiusLineWidth = 0', function () {
        ReactDOM.render(React.createElement(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, radiusLineWidth: 0 }), container);
    });
    it('all props defined', function () {
        ReactDOM.render(React.createElement(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, backgroundColors: backgroundColors, textColors: textColors, fontSize: fontSize, outerBorderColor: outerBorderColor, outerBorderWidth: outerBorderWidth, innerRadius: innerRadius, innerBorderColor: innerBorderColor, innerBorderWidth: innerBorderWidth, radiusLineColor: radiusLineColor, radiusLineWidth: radiusLineWidth, perpendicularText: true, textDistance: textDistance, onStopSpinning: onStopSpinning }), container);
    });
    it('render spin', function () {
        act(function () {
            ReactDOM.render(React.createElement(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: true }), container);
            jest.runOnlyPendingTimers();
        });
    });
    it('render callback trigger', function () {
        var hasBeenCalled = false;
        act(function () {
            ReactDOM.render(React.createElement(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: true, onStopSpinning: function () {
                    hasBeenCalled = true;
                    return null;
                } }), container);
            expect(hasBeenCalled).not.toBe(true);
            jest.runAllTimers();
        });
        expect(hasBeenCalled).toBe(true);
    });
});
