/// <reference types="react" />
interface ImagePropsLocal extends ImageProps {
    _imageHTML?: HTMLImageElement;
}
export interface WheelData {
    image?: ImagePropsLocal;
    option?: string;
    style?: StyleType;
    optionSize?: number;
}
export interface StyleType {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
}
export interface PointerProps {
    src?: string;
    style?: React.CSSProperties;
}
export interface ImageProps {
    uri: string;
    offsetX?: number;
    offsetY?: number;
    sizeMultiplier?: number;
    landscape?: boolean;
}
export {};
