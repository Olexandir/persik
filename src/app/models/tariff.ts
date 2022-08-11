export interface Product {
  product_id: number;
  name: string;
  options: Option[];
}


export interface Option {
  currency: string;
  name: string;
  price: number;
  price_formatted: string;
  product_option_id: number;
}

export interface TariffData {
  currency: string;
  pay_sys: PaymentType[];
  products: Product[];
}

export interface Payment {
  pay_sys: PaymentType;
  product_option_id: number;
}

export interface PaymentInfo {
  description: string;
  invoice_id: number;
  payment_page_url: string;
  sms: Sms;
  user_id: string;
}

interface Sms {
  phone: string;
  message: string;
}

// tslint:disable-next-line: no-namespace
export namespace PaymentName {
  export const ASSIST = 'assist';
  export const MTS = 'ipay_mts';
  export const LIFE = 'ipay_life';
  export const ERIP = 'ipay_erip';
  export const YANDEX = 'yandex';
}

export type PaymentType = 'assist' | 'ipay_mts' | 'ipay_life' | 'ipay_erip' | 'yandex';
