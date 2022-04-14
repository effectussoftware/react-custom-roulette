export interface WheelData {
    option: string;
    style?: StyleType;
    optionSize?: number;
}
export interface StyleType {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
}
export interface SelectorProps {
    src?: string;
    className?: string;
    style?: Record<string, any>;
}
