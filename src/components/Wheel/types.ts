export interface WheelData {
  option: string;
  image?: ImageStyle;
  style?: StyleType;
  optionSize?: number;
}

export interface StyleType {
  backgroundColor?: string;
  textColor?: string;
}

export interface ImageStyle {
  uri?: string;
  width: number;
  height: number;
}
