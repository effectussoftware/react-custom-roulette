/// <reference types="react" />
import { SelectorProps, WheelData } from './types';
interface Props {
    mustStartSpinning: boolean;
    prizeNumber: number;
    data: WheelData[];
    onStopSpinning?: () => any;
    backgroundColors?: string[];
    textColors?: string[];
    outerBorderColor?: string;
    outerBorderWidth?: number;
    innerRadius?: number;
    innerBorderColor?: string;
    innerBorderWidth?: number;
    radiusLineColor?: string;
    radiusLineWidth?: number;
    fontSize?: number;
    perpendicularText?: boolean;
    textDistance?: number;
    spinDuration?: number;
    selectorProps?: SelectorProps;
}
export declare const Wheel: ({ mustStartSpinning, prizeNumber, data, onStopSpinning, backgroundColors, textColors, outerBorderColor, outerBorderWidth, innerRadius, innerBorderColor, innerBorderWidth, radiusLineColor, radiusLineWidth, fontSize, perpendicularText, textDistance, spinDuration, selectorProps, }: Props) => JSX.Element | null;
export {};
