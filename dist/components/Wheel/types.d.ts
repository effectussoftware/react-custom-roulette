export interface WheelDataBase {
    style?: StyleType;
    optionSize?: number;
}
export interface TextOption extends WheelDataBase {
    option: string;
    image?: ImageProps;
}
export interface ImageOption extends WheelDataBase {
    image: ImageProps;
    option?: string;
}
export declare type WheelData = TextOption | ImageOption;
export interface StyleType {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
}
export interface ImageProps {
    uri: string;
    width?: number;
    height?: number;
    offsetX?: number;
    offsetY?: number;
    sizeMultiplier?: number;
    landscape?: boolean;
    _imageHTML?: HTMLImageElement;
}
