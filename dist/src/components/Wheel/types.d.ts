export interface WheelData {
    option: string;
    style?: StyleType;
}
export interface StyleType {
    backgroundColor?: string;
    textColor?: string;
}
export interface SelectorProps {
    src?: string;
    className?: string;
    style?: SelectorStyle;
}
export interface SelectorStyle {
    height?: number;
    width?: number;
}
