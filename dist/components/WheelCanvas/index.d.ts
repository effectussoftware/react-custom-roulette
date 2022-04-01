/// <reference types="react" />
import { WheelData } from '../Wheel/types';
interface WheelCanvasProps extends DrawWheelProps {
    width: string;
    height: string;
    data: WheelData[];
}
interface DrawWheelProps {
    outerBorderColor: string;
    outerBorderWidth: number;
    innerRadius: number;
    innerBorderColor: string;
    innerBorderWidth: number;
    radiusLineColor: string;
    radiusLineWidth: number;
    fontFamily: string;
    fontUpdater: boolean;
    fontSize: number;
    perpendicularText: boolean;
    textDistance: number;
}
declare const WheelCanvas: ({ width, height, data, outerBorderColor, outerBorderWidth, innerRadius, innerBorderColor, innerBorderWidth, radiusLineColor, radiusLineWidth, fontFamily, fontUpdater, fontSize, perpendicularText, textDistance, }: WheelCanvasProps) => JSX.Element;
export default WheelCanvas;
