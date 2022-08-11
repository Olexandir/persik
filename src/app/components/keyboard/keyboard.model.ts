export interface KeyboardItem {
  action?: string;
  size?: number;
  symbol?: string;
}

export interface KeyboardSettings {
  lang: string;
  isUpper: boolean;
  needEmail: boolean;
}
